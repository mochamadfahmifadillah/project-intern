<?php

namespace App\Http\Controllers;

use App\Services\RecommendationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use InvalidArgumentException;

class RecommendationController extends Controller
{
    /**
     * Generate software recommendations.
     *
     * POST /api/v1/recommendations
     */
    public function recommend(
        Request $request,
        RecommendationService $recommendationService
    ): JsonResponse {
        /*
        |--------------------------------------------------------------------------
        | Validate Request
        |--------------------------------------------------------------------------
        */

        $validated = $request->validate([
            'category' => [
                'nullable',
                'string',
                'max:255',
            ],

            'industry' => [
                'nullable',
                'string',
                'max:255',
            ],

            'business_size' => [
                'nullable',
                'string',
                'max:255',
            ],

            'pricing' => [
                'nullable',
                'string',
                'max:255',
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | Make Sure At Least One Answer Exists
        |--------------------------------------------------------------------------
        */

        $hasAnswer = collect($validated)
            ->filter(
                fn ($value) =>
                    $value !== null &&
                    $value !== ''
            )
            ->isNotEmpty();

        if (!$hasAnswer) {
            return response()->json([
                'success' => false,
                'message' => 'Minimal satu kriteria recommendation harus diisi.',
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Generate Recommendation
        |--------------------------------------------------------------------------
        */

        try {
            $session = $recommendationService->recommend(
                $validated,
                Auth::id()
            );
        } catch (InvalidArgumentException $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage(),
            ], 422);
        }

        /*
        |--------------------------------------------------------------------------
        | Transform Recommendation Results
        |--------------------------------------------------------------------------
        */

        $results = $session->results
            ->map(function ($result) {
                $software = $result->software;

                return [
                    'rank' => (int) $result->rank,

                    'score' => (float) $result->score,

                    'fit_indicators' => [
                        'category' => (bool) (
                            $result->fit_indicators['category'] ?? false
                        ),

                        'industry' => (bool) (
                            $result->fit_indicators['industry'] ?? false
                        ),

                        'business_size' => (bool) (
                            $result->fit_indicators['business_size'] ?? false
                        ),

                        'pricing' => (bool) (
                            $result->fit_indicators['pricing'] ?? false
                        ),
                    ],

                    'software' => [
                        'id' => $software->id,
                        'name' => $software->name,
                        'slug' => $software->slug,
                        'description' => $software->description,
                        'website_url' => $software->website_url,
                        'logo' => $software->logo,

                        'category' => $software->category
                            ? [
                                'id' => $software->category->id,
                                'name' => $software->category->name,
                                'slug' => $software->category->slug,
                            ]
                            : null,
                    ],
                ];
            })
            ->values();

        /*
        |--------------------------------------------------------------------------
        | Response
        |--------------------------------------------------------------------------
        */

        return response()->json([
            'success' => true,

            'message' => 'Recommendation berhasil dibuat.',

            'data' => [
                'session' => [
                    'id' => $session->id,
                    'session_key' => $session->session_key,
                    'answers' => $session->answers,
                    'completed_at' => $session->completed_at,
                ],

                'results' => $results,
            ],
        ]);
    }
}
