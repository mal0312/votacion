// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.5.3;

contract Votacion{

    //declaracion de atributos (tipo, acceso)
    struct Candidato{
        string nombre;
        uint votoCont;
    }

    struct Votante{
        bool autorizado;
        bool haVotado;
        uint voto;
    }

    address public propietarioSC;//dueño del contrato     
    string public nombreVotacion;

    mapping (address => Votante) public votantes;
    Candidato[] public candidatos;
    uint public votosTotales;

modifier soloPropietario(){
    require(msg.sender== propietarioSC);
    _;
}

 //constructor del contrato


 constructor(string memory _nombre) {
     propietarioSC=msg.sender;
     nombreVotacion=_nombre;
 }   


 function agregarCandidato(string memory _nombre) public{
     candidatos.push(Candidato(_nombre,0));
 } 
 
 function obtenerNumCandidato()public view returns(uint){
   return candidatos.length;
 }

function autorizar(address _persona)public soloPropietario 
{
    votantes[_persona].autorizado=true;

}
 
 function voto (uint _votoIndex)public {
     require(!votantes[msg.sender].haVotado);
     require (votantes[msg.sender].autorizado);

     votantes[msg.sender].voto=_votoIndex;
     votantes[msg.sender].haVotado=true;

     candidatos[_votoIndex].votoCont+=1;
     votosTotales +=1;

 }
 function finVotacion() public soloPropietario {
     selfdestruct(payable(propietarioSC));

 }
}