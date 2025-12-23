<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index(): \Illuminate\View\View
    {
        return view('booking_index');
    }

    public function create(): \Illuminate\View\View
    {
        return view('booking_form');
    }

    public function calendar(): \Illuminate\View\View
    {
        return view('booking.calendar');
    }

    public function confirm(): \Illuminate\View\View
    {
        return view('booking.confirm');
    }

    public function voucher(): \Illuminate\View\View
    {
        return view('booking.voucher');
    }

    public function pickup(): \Illuminate\View\View
    {
        return view('booking/pickup_form');
    }

    public function storePickup(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'car_images' => 'required|array|min:1',
            'car_images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'car_description' => 'nullable|string|max:1000',
            'fuel_level' => 'required|integer|min:1|max:6',
            'agreement_form' => 'required|file|mimes:pdf|max:10240',
        ]);

        // TODO: Store pickup data in database

        return redirect()->route('booking.complete')->with('success', 'Pickup form submitted successfully!');
    }

    public function returnCar(): \Illuminate\View\View
    {
        return view('booking.return_form');
    }

    public function complete(): \Illuminate\View\View
    {
        return view('booking.booking_complete');
    }

    public function reminder(): \Illuminate\View\View
    {
        // In a real app, this data would come from the database based on active booking
        $bookingData = [
            'carPlate' => 'ABC',
            'carModel' => 'Perodua New Axia',
            'returnTime' => '19:00',
            'returnDate' => '2025-12-19',
            'returnLocation' => 'Student Mall',
        ];

        return view('return_reminder', $bookingData);
    }

    public function orderHistory(): \Illuminate\View\View
    {
        // In a real app, this would fetch bookings from database for the authenticated user
        return view('profile/order_history');
    }

    public function showCancelForm(int $id): \Illuminate\View\View
    {
        // In a real app, this would fetch booking details from database
        $bookingData = [
            'bookingId' => 'UNI-2025-0622-001',
            'customerName' => 'Faizal1234',
            'matricNo' => 'A24C1234',
            'rentalPeriod' => '72 hours',
            'vehicle' => 'Perodua Bezza 2023',
            'plate' => 'ABC 1234',
            'pickup' => 'Student Mall',
            'returnDate' => '2025-12-03 18:00',
            'returnPlace' => 'Student Mall',
        ];

        return view('cancel_booking', $bookingData);
    }

    public function cancelBooking(int $id): \Illuminate\Http\JsonResponse
    {
        // In a real app, this would update the booking status in database
        // $booking = Booking::findOrFail($id);
        // $booking->status = 'cancelled';
        // $booking->save();

        return response()->json([
            'success' => true,
            'message' => 'Booking cancelled successfully',
        ]);
    }

    public function storeReturn(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'car_images' => 'required|array|min:1',
            'car_images.*' => 'image|mimes:jpeg,png,jpg,gif,webp|max:5120',
            'car_description' => 'nullable|string|max:1000',
            'fuel_level' => 'required|integer|min:1|max:6',
            'agreement_form' => 'required|file|mimes:pdf|max:10240',
            'rating' => 'required|integer|min:1|max:5',
            'additional_feedback' => 'nullable|string|max:2000',
            'withdraw_deposit' => 'required|in:yes,no',
        ]);

        // TODO: Store return data in database

        return redirect()->route('booking.complete')->with('success', 'Return form submitted successfully!');
    }

    public function store(Request $request): \Illuminate\Http\RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'id_no' => 'required|string|max:50',
            'pickup' => 'required|string|max:255',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
        ]);

        // TODO: Store booking in database

        return redirect()->route('booking.create')->with('success', 'Booking confirmed successfully!');
    }
}
