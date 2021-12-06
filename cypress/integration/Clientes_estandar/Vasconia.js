/// <reference types="Cypress"/>

//Suite de primeros CP
describe('Detonación de eventos Clientes Estandar', function()
{

    beforeEach(() => { 
        
        //Llamar rutina carga de configuración cliente
    
        //Cargar parametros de parametros.json 
        cy.fixture('parametros').then(function(param){
            this.param = param

            //Llamar rutina login
            cy.login
            (this.param.ambiente.url_amb, this.param.credenciales.credenciales_vasconia.user, this.param.credenciales.credenciales_vasconia.password)
        })

         //Cargar Inputs de inputs.json
        cy.fixture('inputs').then(function(inputs){
            this.inputs = inputs
        })
       
    })

     //CP Carga de citas
/*      it('Carga de citas', function(){

        //Llamar rutina rutinaCargaCitastxt
        cy.rutinaCargaArchivosTXT
        (this.param.modulos.planeacion.carga_pedidos, this.param.archivos.carga_pedidos_txt_vasconia,this.param.archivos.nume_citas)
        
    })   */ 
    //Fin CP


    //CP evento Entrada
    it('Evento Entrada Ayvi', function(){
        
        //Llamar rutina rutinaEventosFormulario
        cy.rutinaEventosListadoMasFormualrio
        (this.param.modulos.eventos.entrada, this.inputs.inputs_vasconia, this.param.credenciales.credenciales_vasconia.mensaje)

    }) 
    //Fin CP evento Entrada


})