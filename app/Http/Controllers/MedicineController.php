<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use App\Models\Category;
use App\Models\Unit;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class MedicineController extends Controller
{
    public function index()
    {
        $medicines = Medicine::with(['category', 'unit'])
            ->withSum(['batches as total_stock' => function ($query) {
                $query->where('status', 'active');
            }], 'stock')
            ->latest()
            ->get();

        $categories = Category::all();
        $units = Unit::all();

        return Inertia::render('Master/Medicines/Index', [
            'medicines' => $medicines,
            'categories' => $categories,
            'units' => $units
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|string|unique:medicines,code|max:255',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'unit_id' => 'required|exists:units,id',
            'base_price' => 'required|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
            'min_stock_alert' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        Medicine::create($validated);
        return redirect()->back()->with('success', 'Obat berhasil ditambahkan.');
    }

    public function update(Request $request, Medicine $medicine)
    {
        $validated = $request->validate([
            'code' => ['required', 'string', 'max:255', Rule::unique('medicines')->ignore($medicine->id)],
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'unit_id' => 'required|exists:units,id',
            'base_price' => 'required|numeric|min:0',
            'sell_price' => 'required|numeric|min:0',
            'min_stock_alert' => 'required|integer|min:0',
            'is_active' => 'boolean'
        ]);

        $medicine->update($validated);
        return redirect()->back()->with('success', 'Obat berhasil diperbarui.');
    }

    public function destroy(Medicine $medicine)
    {
        $medicine->delete();
        return redirect()->back()->with('success', 'Obat berhasil dihapus.');
    }
}
