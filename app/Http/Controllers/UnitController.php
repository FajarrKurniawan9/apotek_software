<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitController extends Controller
{
    public function index()
    {
        $units = Unit::latest()->get();
        return Inertia::render('Master/Units/Index', [
            'units' => $units
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        Unit::create($validated);
        return redirect()->back()->with('success', 'Satuan berhasil ditambahkan.');
    }

    public function update(Request $request, Unit $unit)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string'
        ]);

        $unit->update($validated);
        return redirect()->back()->with('success', 'Satuan berhasil diperbarui.');
    }

    public function destroy(Unit $unit)
    {
        $unit->delete();
        return redirect()->back()->with('success', 'Satuan berhasil dihapus.');
    }
}
