import { Component, OnInit } from '@angular/core';
import { PokeAPIServiceService } from '../poke-apiservice.service';
import { PokeShareInfoService } from '../poke-share-info.service';
import { PokeDetail, Pokemon } from '../pokemon';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
  providers: [PokeAPIServiceService]
})
export class MyComponentComponent implements OnInit {
  
  id: string;
  selectedPokeId: string;
  searchPokeName: string= '';
  pokes: Pokemon[] = [];
  pokeDetail: PokeDetail;


  constructor(private pokeService: PokeAPIServiceService,
    private pokeShareInfoService: PokeShareInfoService) {
    
   }

  ngOnInit(): void {
    this.pokeService.getPokemon().subscribe((data) => {
      data.results.forEach((element, index) => {
        this.pokes.push(new Pokemon(''+index, element.name, element.url))
      });
    });
  }

  go(){
    this.pokeShareInfoService.setValue(this.selectedPokeId);
    if(this.selectedPokeId != ''){
      this.pokeService.getPokemonInfo(this.selectedPokeId).subscribe((data) => this.pokeDetail = data)
    }
  }
}
