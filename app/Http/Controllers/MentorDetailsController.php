<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;        
use Illuminate\Http\Request;  
use Inertia\Inertia;  
use Inertia\Response;
use App\Models\MentorDetails;
use Illuminate\Http\RedirectResponse;
//use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class MentorDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        
        return Inertia::render('Auth/MentorRegistration');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(MentorDetails $mentorDetails)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MentorDetails $mentorDetails)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MentorDetails $mentorDetails)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MentorDetails $mentorDetails)
    {
        //
    }
}
