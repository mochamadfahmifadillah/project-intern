<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PermissionController;
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
| Public Routes
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Test API
|--------------------------------------------------------------------------
*/

Route::get('/test', function () {
    return response()->json([
        'message' => 'API Laravel berhasil!',
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
]);

/*
|--------------------------------------------------------------------------
| Public Software Directory
|--------------------------------------------------------------------------
|
| GET /api/software-directory
| GET /api/software-directory?search=figma
| GET /api/software-directory?category=design
| GET /api/software-directory?search=figma&category=design
|
*/

Route::get('/software-directory', [
    SoftwareController::class,
    'publicIndex',
]);

/*
|--------------------------------------------------------------------------
| Public Software Detail
|--------------------------------------------------------------------------
|
| GET /api/software-directory/{slug}
|
*/

Route::get('/software-directory/{slug}', [
    SoftwareController::class,
    'publicShow',
]);

/*
|--------------------------------------------------------------------------
| Public Software Reviews
|--------------------------------------------------------------------------
|
| GET /api/software-directory/{software}/reviews
|
*/

Route::get('/software-directory/{software}/reviews', [
    SoftwareReviewController::class,
    'index',
]);

/*
|--------------------------------------------------------------------------
| Public Software Ratings
|--------------------------------------------------------------------------
|
| GET /api/software-directory/{software}/ratings
|
| Menampilkan:
| - average_rating
| - total_ratings
| - user_rating
|
*/

Route::get('/software-directory/{software}/ratings', [
    SoftwareRatingController::class,
    'index',
]);

/*
|--------------------------------------------------------------------------
| Public Software Comparison
|--------------------------------------------------------------------------
|
| GET /api/software-comparison?software[]=figma&software[]=trello
|
| Digunakan untuk membandingkan beberapa software
| berdasarkan:
| - Informasi dasar
| - Kategori
| - Fitur
| - Pricing
| - Integrasi
| - Rating
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
|
| GET /api/software-categories-public
|
*/

Route::get('/software-categories-public', [
    SoftwareCategoryController::class,
    'publicIndex',
]);

/*
|--------------------------------------------------------------------------
| Protected Routes
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
    |
    | User yang sudah login dapat:
    |
    | POST   /api/software-directory/{software}/reviews
    | PUT    /api/software-reviews/{softwareReview}
    | PATCH  /api/software-reviews/{softwareReview}
    | DELETE /api/software-reviews/{softwareReview}
    |
    | User hanya dapat mengubah/menghapus review miliknya sendiri.
    |
    */

    Route::post('/software-directory/{software}/reviews', [
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
    |
    | User yang sudah login dapat:
    |
    | POST   /api/software-directory/{software}/ratings
    | PUT    /api/software-ratings/{softwareRating}
    | PATCH  /api/software-ratings/{softwareRating}
    | DELETE /api/software-ratings/{softwareRating}
    |
    | User hanya dapat mengubah/menghapus rating miliknya sendiri.
    |
    */

    /*
    |--------------------------------------------------------------------------
    | Create Rating
    |--------------------------------------------------------------------------
    |
    | POST /api/software-directory/{software}/ratings
    |
    */

    Route::post('/software-directory/{software}/ratings', [
        SoftwareRatingController::class,
        'store',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Update Rating
    |--------------------------------------------------------------------------
    |
    | PUT /api/software-ratings/{softwareRating}
    |
    */

    Route::put('/software-ratings/{softwareRating}', [
        SoftwareRatingController::class,
        'update',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Update Rating - PATCH
    |--------------------------------------------------------------------------
    |
    | PATCH /api/software-ratings/{softwareRating}
    |
    */

    Route::patch('/software-ratings/{softwareRating}', [
        SoftwareRatingController::class,
        'update',
    ]);

    /*
    |--------------------------------------------------------------------------
    | Delete Rating
    |--------------------------------------------------------------------------
    |
    | DELETE /api/software-ratings/{softwareRating}
    |
    */

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
    | Software Pricing Management
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
    | Software Integration Management
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