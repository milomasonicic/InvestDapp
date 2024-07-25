<?php

namespace App\Http\Controllers;

use App\Models\File;
use Inertia\Inertia;
use Illuminate\Http\Request;

class FileController extends Controller
{
    //

    public function index($id, $name)
    {
        return Inertia::render('ImageUpload', [
            'id' => $id,
            'name' => $name,
        ]);
    }

    public function store(Request $request)
    {
      // dd($request);

       $validated=$request->validate([
         'file' => 'required|file|mimes:jpg,jpeg,png|max:2048'
       ]);
       $fileName = time().'.'.$request->file->extension();  
        $request->file->move(public_path('uploads'), $fileName);

        File::create([
            "company_id"=>$request->compID,
            "name"=>$fileName,
        ]);

        return redirect()->route('your.company', [
            'id' => $request->compID,
            
        ]);

    }
}
