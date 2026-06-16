<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Medicine;
use App\Models\MedicineBatch;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\StockMovement;
use App\Models\Unit;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Users
        $owner = User::create([
            'name' => 'Owner System',
            'username' => 'owner',
            'password' => Hash::make('owner123'),
            'role' => 'owner',
            'is_active' => true,
        ]);

        $cashier1 = User::create([
            'name' => 'Kasir Satu',
            'username' => 'kasir1',
            'password' => Hash::make('kasir123'),
            'role' => 'cashier',
            'is_active' => true,
        ]);

        $cashier2 = User::create([
            'name' => 'Kasir Dua',
            'username' => 'kasir2',
            'password' => Hash::make('kasir123'),
            'role' => 'cashier',
            'is_active' => true,
        ]);

        // 2. Create Categories
        $catBebas = Category::create(['name' => 'Obat Bebas', 'description' => 'Obat yang dapat dibeli tanpa resep dokter']);
        $catResep = Category::create(['name' => 'Obat Resep', 'description' => 'Obat yang harus dibeli dengan resep dokter']);
        $catVitamin = Category::create(['name' => 'Vitamin & Suplemen', 'description' => 'Suplemen kesehatan']);

        // 3. Create Units
        $unitStrip = Unit::create(['name' => 'Strip']);
        $unitBotol = Unit::create(['name' => 'Botol']);
        $unitPcs = Unit::create(['name' => 'Pcs']);

        // 4. Create Medicines
        $medicines = [
            [
                'category_id' => $catBebas->id,
                'unit_id' => $unitStrip->id,
                'code' => 'MED-001',
                'name' => 'Paracetamol 500mg',
                'base_price' => 2000.00,
                'sell_price' => 3500.00,
                'min_stock_alert' => 20,
            ],
            [
                'category_id' => $catResep->id,
                'unit_id' => $unitStrip->id,
                'code' => 'MED-002',
                'name' => 'Amoxicillin 500mg',
                'base_price' => 4000.00,
                'sell_price' => 7000.00,
                'min_stock_alert' => 10,
            ],
            [
                'category_id' => $catVitamin->id,
                'unit_id' => $unitBotol->id,
                'code' => 'MED-003',
                'name' => 'Vitamin C 1000mg',
                'base_price' => 35000.00,
                'sell_price' => 45000.00,
                'min_stock_alert' => 5,
            ],
            [
                'category_id' => $catBebas->id,
                'unit_id' => $unitBotol->id,
                'code' => 'MED-004',
                'name' => 'Sirup Obat Batuk',
                'base_price' => 15000.00,
                'sell_price' => 22000.00,
                'min_stock_alert' => 5,
            ],
            [
                'category_id' => $catBebas->id,
                'unit_id' => $unitStrip->id,
                'code' => 'MED-005',
                'name' => 'Ibuprofen 400mg',
                'base_price' => 5000.00,
                'sell_price' => 8500.00,
                'min_stock_alert' => 15,
            ],
            [
                'category_id' => $catVitamin->id,
                'unit_id' => $unitPcs->id,
                'code' => 'MED-006',
                'name' => 'Minyak Angin',
                'base_price' => 12000.00,
                'sell_price' => 16000.00,
                'min_stock_alert' => 10,
            ],
            [
                'category_id' => $catBebas->id,
                'unit_id' => $unitStrip->id,
                'code' => 'MED-007',
                'name' => 'Antasida Doen',
                'base_price' => 2500.00,
                'sell_price' => 4000.00,
                'min_stock_alert' => 20,
            ],
            [
                'category_id' => $catResep->id,
                'unit_id' => $unitStrip->id,
                'code' => 'MED-008',
                'name' => 'Cefadroxil 500mg',
                'base_price' => 10000.00,
                'sell_price' => 15000.00,
                'min_stock_alert' => 10,
            ],
            [
                'category_id' => $catBebas->id,
                'unit_id' => $unitBotol->id,
                'code' => 'MED-009',
                'name' => 'Betadine 15ml',
                'base_price' => 11000.00,
                'sell_price' => 15500.00,
                'min_stock_alert' => 5,
            ],
            [
                'category_id' => $catVitamin->id,
                'unit_id' => $unitStrip->id,
                'code' => 'MED-010',
                'name' => 'Neurobion Forte',
                'base_price' => 28000.00,
                'sell_price' => 38000.00,
                'min_stock_alert' => 10,
            ],
        ];

        $medicineModels = [];
        foreach ($medicines as $med) {
            $medicineModels[] = Medicine::create($med);
        }

        // 5. Create Batches & Stock Movements for the first 3 medicines
        $batchData = [
            // Medicine 1
            [
                'medicine' => $medicineModels[0],
                'batches' => [
                    ['batch_number' => 'B2025-01A', 'stock' => 50, 'expired_date' => Carbon::now()->addYears(2)->format('Y-m-d')],
                    ['batch_number' => 'B2025-01B', 'stock' => 30, 'expired_date' => Carbon::now()->addYears(3)->format('Y-m-d')],
                ]
            ],
            // Medicine 2
            [
                'medicine' => $medicineModels[1],
                'batches' => [
                    ['batch_number' => 'B2025-02A', 'stock' => 40, 'expired_date' => Carbon::now()->addYears(2)->format('Y-m-d')],
                    ['batch_number' => 'B2025-02B', 'stock' => 20, 'expired_date' => Carbon::now()->addYears(2)->addMonths(6)->format('Y-m-d')],
                ]
            ],
            // Medicine 3
            [
                'medicine' => $medicineModels[2],
                'batches' => [
                    ['batch_number' => 'B2025-03A', 'stock' => 15, 'expired_date' => Carbon::now()->addYears(1)->addMonths(6)->format('Y-m-d')],
                    ['batch_number' => 'B2025-03B', 'stock' => 10, 'expired_date' => Carbon::now()->addYears(2)->format('Y-m-d')],
                ]
            ],
        ];

        foreach ($batchData as $data) {
            foreach ($data['batches'] as $b) {
                $batch = MedicineBatch::create([
                    'medicine_id' => $data['medicine']->id,
                    'batch_number' => $b['batch_number'],
                    'stock' => $b['stock'],
                    'expired_date' => $b['expired_date'],
                    'status' => 'active',
                ]);

                // Record initial stock movement
                StockMovement::create([
                    'batch_id' => $batch->id,
                    'user_id' => $owner->id,
                    'reference_type' => 'stock_in',
                    'reference_id' => null,
                    'qty_change' => $b['stock'],
                    'stock_before' => 0,
                    'stock_after' => $b['stock'],
                    'note' => 'Initial stock seed',
                ]);
            }
        }
    }
}
