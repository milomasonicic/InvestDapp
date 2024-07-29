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

        $idComp = $offer->company_id;

        $company = Company::with(["file" => function($query){
            $query->latest()->first();
        }])->findorfail($idComp);

        $founderId= $company->founder_id;
        
        $founder = User::findOrFail($founderId);

        
        return Inertia::render("CompanyProfile3", [
            "company"=> $company,
            "offer"=> $offer,
            "founder"=> $founder,
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
