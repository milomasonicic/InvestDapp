<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
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
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $transaction = Transaction::create([
            "walletAdress"=> $request->walletAdress,
            "amount"=> $request->amount,
            "user_id"=> $request->user_id,
            "company_id"=> $request->company_id,
            "status"=> $request->status
        ]);
    }

    public function fetchTransactions($id)
    {
        $yourtransaction = Transaction::with('company')->where('user_id', $id)->get();
 
        return $yourtransaction;

    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
