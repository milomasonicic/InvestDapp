<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Offer;
use App\Models\Company;
use Illuminate\Http\Request;

class OfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $offers = Offer::with('company')->get();

        return $offers;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
       // dd($request);

        $offer = Offer::create([
            "seller_walletAdress"=> $request->seller_walletAdress,
            "amount_of_stocks"=> $request->amountStocks,
            "seller_id"=> $request->seller_id,
            "company_id"=> $request->company_id
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function showOffer($id)
    {
        $offer = Offer::findorfail($id);

        //seller - note to self: ako bude vremena provjeriti imena u tabeli je eager load ne radi kako treba
        $sellerId = $offer->seller_id;
        $seller = User::find($sellerId);

        //company
        $idComp = $offer->company_id;



        $company = Company::with(["file" => function($query){
            $query->latest()->first();
        }])->findorfail($idComp);



        
        return Inertia::render("Offer", [
            "company"=> $company,
            "offer"=> $offer,
            "seller"=> $seller,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Offer $offer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Offer $offer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offer $offer)
    {
        //
    }
}
