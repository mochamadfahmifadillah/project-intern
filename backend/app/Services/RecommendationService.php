<?php

namespace App\Services;

use App\Models\RecommendationResult;
use App\Models\RecommendationSession;
use App\Models\Software;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class RecommendationService
{
    /**
     * Bobot recommendation.
     *
     * Total = 100
     */
    private const CATEGORY_WEIGHT = 40;
    private const INDUSTRY_WEIGHT = 25;
    private const BUSINESS_SIZE_WEIGHT = 20;
    private const PRICING_WEIGHT = 15;

    /**
     * Generate recommendation berdasarkan jawaban user.
     */
    public function recommend(
        array $answers,
        ?int $userId = null
    ): RecommendationSession {
        $this->validateAnswers($answers);

        return DB::transaction(function () use (
            $answers,
            $userId
        ) {
            /*
            |--------------------------------------------------------------------------
            | Create Recommendation Session
            |--------------------------------------------------------------------------
            */

            $session = RecommendationSession::create([
                'user_id' => $userId,
                'session_key' => Str::uuid()->toString(),
                'answers' => $answers,
                'completed_at' => now(),
            ]);

            /*
            |--------------------------------------------------------------------------
            | Get Active Software
            |--------------------------------------------------------------------------
            */

            $softwares = Software::with([
                'category',
                'pricings.pricingModel',
                'industries',
                'businessSizes',
            ])
                ->where('status', 'active')
                ->get();

            /*
            |--------------------------------------------------------------------------
            | Calculate Score
            |--------------------------------------------------------------------------
            */

            $results = [];

            foreach ($softwares as $software) {
                $score = 0;

                $fitIndicators = [
                    'category' => false,
                    'industry' => false,
                    'business_size' => false,
                    'pricing' => false,
                ];

                /*
                |--------------------------------------------------------------------------
                | Category
                |--------------------------------------------------------------------------
                */

                if (
                    !empty($answers['category']) &&
                    $software->category &&
                    $software->category->slug === $answers['category']
                ) {
                    $score += self::CATEGORY_WEIGHT;

                    $fitIndicators['category'] = true;
                }

                /*
                |--------------------------------------------------------------------------
                | Industry
                |--------------------------------------------------------------------------
                */

                if (!empty($answers['industry'])) {
                    $industryMatch = $software->industries
                        ->contains(
                            'slug',
                            $answers['industry']
                        );

                    if ($industryMatch) {
                        $score += self::INDUSTRY_WEIGHT;

                        $fitIndicators['industry'] = true;
                    }
                }

                /*
                |--------------------------------------------------------------------------
                | Business Size
                |--------------------------------------------------------------------------
                */

                if (!empty($answers['business_size'])) {
                    $businessSizeMatch = $software->businessSizes
                        ->contains(
                            'slug',
                            $answers['business_size']
                        );

                    if ($businessSizeMatch) {
                        $score += self::BUSINESS_SIZE_WEIGHT;

                        $fitIndicators['business_size'] = true;
                    }
                }

                /*
                |--------------------------------------------------------------------------
                | Pricing Model
                |--------------------------------------------------------------------------
                */

                if (!empty($answers['pricing'])) {
                    $pricingMatch = $software->pricings
                        ->contains(function ($pricing) use ($answers) {
                            return $pricing->pricingModel &&
                                (
                                    $pricing->pricingModel->slug ===
                                        $answers['pricing']
                                    ||
                                    Str::lower(
                                        $pricing->pricingModel->name
                                    ) === Str::lower(
                                        $answers['pricing']
                                    )
                                );
                        });

                    if ($pricingMatch) {
                        $score += self::PRICING_WEIGHT;

                        $fitIndicators['pricing'] = true;
                    }
                }

                /*
                |--------------------------------------------------------------------------
                | Only Include Matching Software
                |--------------------------------------------------------------------------
                */

                if ($score > 0) {
                    $results[] = [
                        'software' => $software,
                        'score' => $score,
                        'fit_indicators' => $fitIndicators,
                    ];
                }
            }

            /*
            |--------------------------------------------------------------------------
            | Sort By Score
            |--------------------------------------------------------------------------
            */

            usort(
                $results,
                function ($a, $b) {
                    return $b['score'] <=> $a['score'];
                }
            );

            /*
            |--------------------------------------------------------------------------
            | Save Recommendation Results
            |--------------------------------------------------------------------------
            */

            foreach ($results as $index => $result) {
                RecommendationResult::create([
                    'recommendation_session_id' => $session->id,
                    'software_id' => $result['software']->id,
                    'score' => $result['score'],
                    'rank' => $index + 1,
                    'fit_indicators' => $result['fit_indicators'],
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | Load Results
            |--------------------------------------------------------------------------
            */

            $session->load([
                'results.software.category',
                'results.software.pricings.pricingModel',
                'results.software.industries',
                'results.software.businessSizes',
            ]);

            return $session;
        });
    }

    /**
     * Validate recommendation answers.
     */
    private function validateAnswers(array $answers): void
    {
        $allowedKeys = [
            'category',
            'industry',
            'business_size',
            'pricing',
        ];

        foreach ($answers as $key => $value) {
            if (!in_array($key, $allowedKeys, true)) {
                throw new \InvalidArgumentException(
                    "Parameter recommendation tidak valid: {$key}"
                );
            }
        }
    }
}