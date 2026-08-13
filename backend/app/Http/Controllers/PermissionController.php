<?php

namespace App\Http\Controllers;

use App\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        return response()->json(
            Permission::orderBy('name')->get()
        );
    }
}