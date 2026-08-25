<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BusinessSizeController;
use App\Http\Controllers\IndustryController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SoftwareCategoryController;
use App\Http\Controllers\SoftwareComparisonController;
use App\Http\Controllers\SoftwareController;
use App\Http\Controllers\SoftwareFeatureController;
use App\Http\Controllers\SoftwareIntegrationController;
use App\Http\Controllers\SoftwarePricingController;
use App\Http\Controllers\SoftwareRatingController;
use App\Http\Controllers\SoftwareReviewController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VendorController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Base URL:
| /api
|
| API Version:
| /api/v1
|
*/

/*
|--------------------------------------------------------------------------
| API V1
|--------------------------------------------------------------------------
*/

Route::prefix('v1')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | Public API
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | Test
    |--------------------------------------------------------------------------
    */

    Route::get('/test', function () {
        return response()->json([
            'success' => true,
            'message' => 'API Laravel berhasil!',
            'version' => 'v1',
        ]);
    });

    /*
    |--------------------------------------------------------------------------
    | Authentication
    |--------------------------------------------------------------------------
    */

    Route::post('/register', [
        AuthController::class,
        'register',
    ]);

    Route::post('/login', [
        AuthController::class,
        'login',
    ])->name('login');

    /*
    |--------------------------------------------------------------------------
    | Public Software Directory
    |--------------------------------------------------------------------------
    */

    /*
    |--------------------------------------------------------------------------
    | GET /api/v1/software-directory
    |--------------------------------------------------------------------------
    |
    | Optional query:
    |
    | ?search=figma
    | ?category=design
    | ?search=figma&category=design
    |
    */

    Route::get('/software-directory', [
        SoftwareController::class,
        'publicIndex',
    ]);

    /*
    |--------------------------------------------------------------------------
    | GET /api/v1/software-directory/{slug}
    |--------------------------------------------------------------------------
    */

    Route::get('/software-directory/{slug}', [
        SoftwareController::class,
        'publicShow',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Public Software Reviews
    |--------------------------------------------------------------------------
    */

    Route::get('/software-directory/{software:slug}/reviews', [
        SoftwareReviewController::class,
        'index',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Public Software Ratings
    |--------------------------------------------------------------------------
    */

    Route::get('/software-directory/{software:slug}/ratings', [
        SoftwareRatingController::class,
        'index',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Public Software Comparison
    |--------------------------------------------------------------------------
    |
    | Example:
    |
    | /api/v1/software-comparison?software[]=figma&software[]=trello
    |
    */

    Route::get('/software-comparison', [
        SoftwareComparisonController::class,
        'compare',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Public Software Categories
    |--------------------------------------------------------------------------
    */

    Route::get('/software-categories-public', [
        SoftwareCategoryController::class,
        'publicIndex',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Software Recommendation
    |--------------------------------------------------------------------------
    |
    | POST /api/v1/recommendations
    |
    | Recommendation dapat digunakan oleh guest maupun authenticated user.
    |
    | Example body:
    |
    | {
    |     "category": "design",
    |     "industry": "technology",
    |     "business_size": "small-business",
    |     "pricing": "free"
    | }
    |
    */

    Route::post('/recommendations', [
        RecommendationController::class,
        'recommend',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Protected API
    |--------------------------------------------------------------------------
    */

    Route::middleware('auth:sanctum')->group(function () {

        /*
        |--------------------------------------------------------------------------
        | Authentication & Account
        |--------------------------------------------------------------------------
        */

        Route::get('/user', [
            AuthController::class,
            'user',
        ]);

        Route::get('/dashboard', [
            AuthController::class,
            'dashboard',
        ]);

        Route::put('/user/password', [
            AuthController::class,
            'updatePassword',
        ]);

        Route::post('/logout', [
            AuthController::class,
            'logout',
        ]);

        /*
        |--------------------------------------------------------------------------
        | User Management
        |--------------------------------------------------------------------------
        */

        Route::get('/users', [
            UserController::class,
            'index',
        ])->middleware('permission:users.view');

        Route::get('/users/{user}', [
            UserController::class,
            'show',
        ])->middleware('permission:users.view');

        Route::post('/users', [
            UserController::class,
            'store',
        ])->middleware('permission:users.create');

        Route::put('/users/{user}', [
            UserController::class,
            'update',
        ])->middleware('permission:users.edit');

        Route::delete('/users/{user}', [
            UserController::class,
            'destroy',
        ])->middleware('permission:users.delete');

        /*
        |--------------------------------------------------------------------------
        | Role Management
        |--------------------------------------------------------------------------
        */

        Route::get('/roles', [
            RoleController::class,
            'index',
        ])->middleware('permission:roles.view');

        Route::get('/roles/{role}', [
            RoleController::class,
            'show',
        ])->middleware('permission:roles.view');

        Route::post('/roles', [
            RoleController::class,
            'store',
        ])->middleware('permission:roles.create');

        Route::put('/roles/{role}', [
            RoleController::class,
            'update',
        ])->middleware('permission:roles.edit');

        Route::delete('/roles/{role}', [
            RoleController::class,
            'destroy',
        ])->middleware('permission:roles.delete');

        /*
        |--------------------------------------------------------------------------
        | Permission Management
        |--------------------------------------------------------------------------
        */

        Route::get('/permissions', [
            PermissionController::class,
            'index',
        ])->middleware('permission:permissions.view');

        Route::get('/permissions/{permission}', [
            PermissionController::class,
            'show',
        ])->middleware('permission:permissions.view');

        Route::post('/permissions', [
            PermissionController::class,
            'store',
        ])->middleware('permission:permissions.create');

        Route::put('/permissions/{permission}', [
            PermissionController::class,
            'update',
        ])->middleware('permission:permissions.edit');

        Route::delete('/permissions/{permission}', [
            PermissionController::class,
            'destroy',
        ])->middleware('permission:permissions.delete');

        /*
        |--------------------------------------------------------------------------
        | Industry Management
        |--------------------------------------------------------------------------
        */

        Route::get('/industries', [
            IndustryController::class,
            'index',
        ])->middleware('permission:industries.view');

        Route::get('/industries/{industry}', [
            IndustryController::class,
            'show',
        ])->middleware('permission:industries.view');

        Route::post('/industries', [
            IndustryController::class,
            'store',
        ])->middleware('permission:industries.create');

        Route::put('/industries/{industry}', [
            IndustryController::class,
            'update',
        ])->middleware('permission:industries.edit');

        Route::delete('/industries/{industry}', [
            IndustryController::class,
            'destroy',
        ])->middleware('permission:industries.delete');

        /*
        |--------------------------------------------------------------------------
        | Business Size Management
        |--------------------------------------------------------------------------
        */

        Route::get('/business-sizes', [
            BusinessSizeController::class,
            'index',
        ])->middleware('permission:business-sizes.view');

        Route::get('/business-sizes/{businessSize}', [
            BusinessSizeController::class,
            'show',
        ])->middleware('permission:business-sizes.view');

        Route::post('/business-sizes', [
            BusinessSizeController::class,
            'store',
        ])->middleware('permission:business-sizes.create');

        Route::put('/business-sizes/{businessSize}', [
            BusinessSizeController::class,
            'update',
        ])->middleware('permission:business-sizes.edit');

        Route::delete('/business-sizes/{businessSize}', [
            BusinessSizeController::class,
            'destroy',
        ])->middleware('permission:business-sizes.delete');

        /*
        |--------------------------------------------------------------------------
        | Software Category Management
        |--------------------------------------------------------------------------
        */

        Route::get('/software-categories', [
            SoftwareCategoryController::class,
            'index',
        ])->middleware('permission:software-categories.view');

        Route::get('/software-categories/{softwareCategory}', [
            SoftwareCategoryController::class,
            'show',
        ])->middleware('permission:software-categories.view');

        Route::post('/software-categories', [
            SoftwareCategoryController::class,
            'store',
        ])->middleware('permission:software-categories.create');

        Route::put('/software-categories/{softwareCategory}', [
            SoftwareCategoryController::class,
            'update',
        ])->middleware('permission:software-categories.edit');

        Route::delete('/software-categories/{softwareCategory}', [
            SoftwareCategoryController::class,
            'destroy',
        ])->middleware('permission:software-categories.delete');

        /*
        |--------------------------------------------------------------------------
        | Software Management
        |--------------------------------------------------------------------------
        */

        Route::get('/softwares', [
            SoftwareController::class,
            'index',
        ])->middleware('permission:softwares.view');

        Route::get('/softwares/{software}', [
            SoftwareController::class,
            'show',
        ])->middleware('permission:softwares.view');

        Route::post('/softwares', [
            SoftwareController::class,
            'store',
        ])->middleware('permission:softwares.create');

        Route::put('/softwares/{software}', [
            SoftwareController::class,
            'update',
        ])->middleware('permission:softwares.edit');

        Route::delete('/softwares/{software}', [
            SoftwareController::class,
            'destroy',
        ])->middleware('permission:softwares.delete');

        /*
        |--------------------------------------------------------------------------
        | Software Reviews
        |--------------------------------------------------------------------------
        */

        Route::post('/software-directory/{software:slug}/reviews', [
            SoftwareReviewController::class,
            'store',
        ]);

        Route::put('/software-reviews/{softwareReview}', [
            SoftwareReviewController::class,
            'update',
        ]);

        Route::patch('/software-reviews/{softwareReview}', [
            SoftwareReviewController::class,
            'update',
        ]);

        Route::delete('/software-reviews/{softwareReview}', [
            SoftwareReviewController::class,
            'destroy',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Software Ratings
        |--------------------------------------------------------------------------
        */

        Route::post('/software-directory/{software:slug}/ratings', [
            SoftwareRatingController::class,
            'store',
        ]);

        Route::put('/software-ratings/{softwareRating}', [
            SoftwareRatingController::class,
            'update',
        ]);

        Route::patch('/software-ratings/{softwareRating}', [
            SoftwareRatingController::class,
            'update',
        ]);

        Route::delete('/software-ratings/{softwareRating}', [
            SoftwareRatingController::class,
            'destroy',
        ]);

        /*
        |--------------------------------------------------------------------------
        | Software Features
        |--------------------------------------------------------------------------
        */

        Route::get('/software-features', [
            SoftwareFeatureController::class,
            'index',
        ])->middleware('permission:software-features.view');

        Route::get('/software-features/{softwareFeature}', [
            SoftwareFeatureController::class,
            'show',
        ])->middleware('permission:software-features.view');

        Route::post('/software-features', [
            SoftwareFeatureController::class,
            'store',
        ])->middleware('permission:software-features.create');

        Route::put('/software-features/{softwareFeature}', [
            SoftwareFeatureController::class,
            'update',
        ])->middleware('permission:software-features.edit');

        Route::delete('/software-features/{softwareFeature}', [
            SoftwareFeatureController::class,
            'destroy',
        ])->middleware('permission:software-features.delete');

        /*
        |--------------------------------------------------------------------------
        | Software Pricing
        |--------------------------------------------------------------------------
        */

        Route::get('/software-pricings', [
            SoftwarePricingController::class,
            'index',
        ])->middleware('permission:software-pricings.view');

        Route::get('/software-pricings/{softwarePricing}', [
            SoftwarePricingController::class,
            'show',
        ])->middleware('permission:software-pricings.view');

        Route::post('/software-pricings', [
            SoftwarePricingController::class,
            'store',
        ])->middleware('permission:software-pricings.create');

        Route::put('/software-pricings/{softwarePricing}', [
            SoftwarePricingController::class,
            'update',
        ])->middleware('permission:software-pricings.edit');

        Route::delete('/software-pricings/{softwarePricing}', [
            SoftwarePricingController::class,
            'destroy',
        ])->middleware('permission:software-pricings.delete');

        /*
        |--------------------------------------------------------------------------
        | Software Integrations
        |--------------------------------------------------------------------------
        */

        Route::get('/software-integrations', [
            SoftwareIntegrationController::class,
            'index',
        ])->middleware('permission:software-integrations.view');

        Route::get('/software-integrations/{softwareIntegration}', [
            SoftwareIntegrationController::class,
            'show',
        ])->middleware('permission:software-integrations.view');

        Route::post('/software-integrations', [
            SoftwareIntegrationController::class,
            'store',
        ])->middleware('permission:software-integrations.create');

        Route::put('/software-integrations/{softwareIntegration}', [
            SoftwareIntegrationController::class,
            'update',
        ])->middleware('permission:software-integrations.edit');

        Route::patch('/software-integrations/{softwareIntegration}', [
            SoftwareIntegrationController::class,
            'update',
        ])->middleware('permission:software-integrations.edit');

        Route::delete('/software-integrations/{softwareIntegration}', [
            SoftwareIntegrationController::class,
            'destroy',
        ])->middleware('permission:software-integrations.delete');

        /*
        |--------------------------------------------------------------------------
        | Vendor Management
        |--------------------------------------------------------------------------
        */

        Route::get('/vendors', [
            VendorController::class,
            'index',
        ])->middleware('permission:vendors.view');

        Route::get('/vendors/{vendor}', [
            VendorController::class,
            'show',
        ])->middleware('permission:vendors.view');

        Route::post('/vendors', [
            VendorController::class,
            'store',
        ])->middleware('permission:vendors.create');

        Route::put('/vendors/{vendor}', [
            VendorController::class,
            'update',
        ])->middleware('permission:vendors.edit');

        Route::patch('/vendors/{vendor}', [
            VendorController::class,
            'update',
        ])->middleware('permission:vendors.edit');

        Route::delete('/vendors/{vendor}', [
            VendorController::class,
            'destroy',
        ])->middleware('permission:vendors.delete');
    });
});
