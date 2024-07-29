<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\FileController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/companyform', [CompanyController::class, 'companyForm'])->name('companyform');
    
    Route::get('/allCompanies', [CompanyController::class, 'all'])->name('company.all');
    
    Route::post('/createCompany', [CompanyController::class, 'store'])->name('company.store');


    Route::get('/companyProfile/{id}', [CompanyController::class, 'show'])->name('your.company');
    Route::get('/companyprof/{id}', [CompanyController::class, 'showCompanyProfil'])->name('your.compinvestmet');
    
    Route::get('/yourPage', [ProfileController::class, 'yourPage'])->name('profile.yourpage');
    
    Route::get('/imageUpload/{id}/{name}', [FileController::class, 'index'])->name('file.form');
    Route::post('/imagestore', [FileController::class, 'store'])->name('file.store');
    
    
    Route::post('/offerStore', [OfferController::class, 'store'])->name('offer.store');
    Route::get('/offerProfile/{id}', [OfferController::class, 'showOffer'])->name('offer.show');
});

require __DIR__.'/auth.php';
