<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Booking::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'bookingType' => 'required',
            'bookingDate' => 'required|date',
            'bookingSlot' => 'required',
            'bookingTime' => 'required',
        ]);

        $booking = new Booking();
        $booking->name = $request->name;
        $booking->email = $request->email;
        $booking->booking_type = $request->bookingType;
        $booking->booking_date = date('Y-m-d H:i:s', strtotime($request->bookingDate));
        $booking->booking_slot = $request->bookingSlot;
        $booking->booking_time = $request->bookingTime;
        
        $booking->save();

        return response()->json($booking, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $booking = Booking::findOrFail($id);
        return response()->json($booking, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'bookingType' => 'required',
            'bookingDate' => 'required|date',
            'bookingSlot' => 'required',
            'bookingTime' => 'required',
        ]);

        $booking = Booking::findOrFail($id);

        $booking->name = $request->name;
        $booking->email = $request->email;
        $booking->booking_type = $request->bookingType;
        $booking->booking_date = date('Y-m-d H:i:s', strtotime($request->bookingDate));
        $booking->booking_slot = $request->bookingSlot;
        $booking->booking_time = $request->bookingTime;
        
        $booking->save();

        return response()->json($booking, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        Booking::destroy($id);

        return response()->json(null, 204);
    }
}
