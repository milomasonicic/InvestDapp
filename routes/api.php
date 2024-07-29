<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//storeTransaction
Route::post('/storeTransaction', [TransactionController::class, "store"])->name("transaction.store");

//getTransactions your
Route::get('/personalTransaction/{id}', [TransactionController::class, "fetchTransactions"])->name("your.transaction");

//getCompanyName
Route::get('/companyName/{id}', [CompanyController::class, "fetchCompanyName"])->name("company.name");

//userName
Route::get('/userName/{id}', [ProfileController::class, "userName"])->name("user.name");

//seeOffers
Route::get('/offers', [OfferController::class, "index"])->name("offer.market");