<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SoftwareCategoryController;
use App\Http\Controllers\SoftwareController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/test', function () {
    return response()->json([
        'message' => 'API Laravel berhasil!',
    ]);
});

// Authentication
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);


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

    // Current authenticated user
    Route::get('/user', [AuthController::class, 'user']);

    // Dashboard statistics
    Route::get('/dashboard', [AuthController::class, 'dashboard']);

    // Update password
    Route::put('/user/password', [AuthController::class, 'updatePassword']);

    // Logout
    Route::post('/logout', [AuthController::class, 'logout']);


    /*
    |--------------------------------------------------------------------------
    | User Management
    |--------------------------------------------------------------------------
    */

    Route::get('/users', [UserController::class, 'index'])
        ->middleware('permission:users.view');

    Route::get('/users/{user}', [UserController::class, 'show'])
        ->middleware('permission:users.view');

    Route::post('/users', [UserController::class, 'store'])
        ->middleware('permission:users.create');

    Route::put('/users/{user}', [UserController::class, 'update'])
        ->middleware('permission:users.edit');

    Route::delete('/users/{user}', [UserController::class, 'destroy'])
        ->middleware('permission:users.delete');


    /*
    |--------------------------------------------------------------------------
    | Role Management
    |--------------------------------------------------------------------------
    */

    Route::get('/roles', [RoleController::class, 'index'])
        ->middleware('permission:roles.view');

    Route::get('/roles/{role}', [RoleController::class, 'show'])
        ->middleware('permission:roles.view');

    Route::post('/roles', [RoleController::class, 'store'])
        ->middleware('permission:roles.create');

    Route::put('/roles/{role}', [RoleController::class, 'update'])
        ->middleware('permission:roles.edit');

    Route::delete('/roles/{role}', [RoleController::class, 'destroy'])
        ->middleware('permission:roles.delete');


    /*
    |--------------------------------------------------------------------------
    | Permission Management
    |--------------------------------------------------------------------------
    */

    Route::get('/permissions', [PermissionController::class, 'index'])
        ->middleware('permission:permissions.view');

    Route::get('/permissions/{permission}', [PermissionController::class, 'show'])
        ->middleware('permission:permissions.view');

    Route::post('/permissions', [PermissionController::class, 'store'])
        ->middleware('permission:permissions.create');

    Route::put('/permissions/{permission}', [PermissionController::class, 'update'])
        ->middleware('permission:permissions.edit');

    Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])
        ->middleware('permission:permissions.delete');


    /*
    |--------------------------------------------------------------------------
    | Software Category Management
    |--------------------------------------------------------------------------
    */

    Route::get('/software-categories', [SoftwareCategoryController::class, 'index'])
        ->middleware('permission:software-categories.view');

    Route::get('/software-categories/{softwareCategory}', [SoftwareCategoryController::class, 'show'])
        ->middleware('permission:software-categories.view');

    Route::post('/software-categories', [SoftwareCategoryController::class, 'store'])
        ->middleware('permission:software-categories.create');

    Route::put('/software-categories/{softwareCategory}', [SoftwareCategoryController::class, 'update'])
        ->middleware('permission:software-categories.edit');

    Route::delete('/software-categories/{softwareCategory}', [SoftwareCategoryController::class, 'destroy'])
        ->middleware('permission:software-categories.delete');


    /*
    |--------------------------------------------------------------------------
    | Software Management
    |--------------------------------------------------------------------------
    */

    Route::get('/softwares', [SoftwareController::class, 'index'])
        ->middleware('permission:softwares.view');

    Route::get('/softwares/{software}', [SoftwareController::class, 'show'])
        ->middleware('permission:softwares.view');

    Route::post('/softwares', [SoftwareController::class, 'store'])
        ->middleware('permission:softwares.create');

    Route::put('/softwares/{software}', [SoftwareController::class, 'update'])
        ->middleware('permission:softwares.edit');

    Route::delete('/softwares/{software}', [SoftwareController::class, 'destroy'])
        ->middleware('permission:softwares.delete');
});