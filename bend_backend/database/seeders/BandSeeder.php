<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $bands = [
            [
                "name" => 'Ok Band',
                "description" => 'Ok Band je srpski pop bend osnovan 1993. godine u Beogradu. Bend je osnovan od strane pevača i gitariste Saše Vasića, koji je i dalje jedini preostali član originalne postave. Bend je postao poznat po hitovima kao što su "A u medjuvremenu", "Uzela si ciglu", "Ako mi se neko javi", "Odlazim, a volim te" i "Zbog tebe".',
            ],
            [
                "name" => 'Riblja Čorba',
                "description" => 'Riblja Čorba je srpski rok bend osnovan 1978. godine u Beogradu. Bend je osnovan od strane pevača i gitariste Bore Đorđevića. Bend je postao poznat po hitovima kao što su "Amsterdam", "Lutka sa naslovne strane", "Kada padne noć", "Dva dinara, druže", "Nemoj srećo, nemoj danas" i "Rekla je".',
            ],
            [
                "name" => 'Van Gogh',
                "description" => 'Van Gogh je srpski rok bend osnovan 1986. godine u Beogradu. Bend je osnovan od strane pevača i gitariste Zvonka Pantovića. Bend je postao poznat po hitovima kao što su "Neko te ima", "Kiselina", "Delfin", "Anđele moj brate" i "Drumovi".',
            ],
            [
                "name" => 'Bajaga i Instruktori',
                "description" => 'Bajaga i Instruktori je srpski rok bend osnovan 1984. godine u Beogradu. Bend je osnovan od strane pevača i gitariste Momčila Bajagića. Bend je postao poznat po hitovima kao što su "Moji drugovi", "Plavi safir", "Berlin", "Muzika na struju" i "Verujem, ne verujem".',
            ]
        ];

        foreach ($bands as $band) {
            \App\Models\Band::create($band);
        }
    }
}
