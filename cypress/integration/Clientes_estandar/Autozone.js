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
            (this.param.ambiente.url_amb, this.param.credenciales.credenciales_autozone.user, this.param.credenciales.credenciales_autozone.password)
        })

         //Cargar Inputs de inputs.json
        cy.fixture('inputs').then(function(inputs){
            this.inputs = inputs
        })
       
    })

     //CP Carga de citas
     it('Carga de pedidos', function(){

        //Llamar rutina rutinaCargaCitastxt
        cy.rutinaCargaCitastxt
        (this.param.modulos.planeacion.carga_pedidos, this.param.archivos.carga_pedidos_txt_autozone,this.param.archivos.nume_pedidos)
        
    })  
    //Fin CP

})