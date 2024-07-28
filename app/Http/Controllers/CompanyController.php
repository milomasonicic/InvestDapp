<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    

    public function companyForm(){

        return Inertia::render("CompanyForm");
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required',
            'founder_id'=>'required'
        ]);
        
      

        $company =  Company::create($validated);
        $id = $company->id;
        $name = $company->name;

        return redirect()->route('file.form', [
            'id' => $id,
            'name' => $name
        ]);
    }

    public function show($id){
        $company = Company::with(["file" => function($query){
            $query->latest()->first();
        }])->findorfail($id);

        $userId = $company->founder_id;
        
        
        $founder = User::findOrFail($userId);

        $founderName = $founder->name;
        return Inertia::render("CompanyProfile", [
            "company"=> $company,
            "founder"=> $founderName,
        ]);
    }

    //See all companies

    public function all(){

        $companies = Company::all();

        return Inertia::render("AllCompanies", [
            "companies"=> $companies,
        ]);

    }

    //get Company Name - api route

    public function fetchCompanyName($id){

        $company = Company::find($id);
        $name = $company->name; 

        return $name;
    }
}
