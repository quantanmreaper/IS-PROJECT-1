<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Unit;
class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //return view('units.index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        return Inertia::render('Auth/UnitsAddition');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|max:255',
            'description' => 'required',
        ]);

        $units = Unit::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->route('dashboard')->with('success', '🎉 Your unit has been registered! Thank you for contributing.');

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
