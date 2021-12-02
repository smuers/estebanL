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
            (this.param.ambiente.url_amb, this.param.credenciales.credenciales_ayvi.user, this.param.credenciales.credenciales_ayvi.password)
        })

         //Cargar Inputs de inputs.json
        cy.fixture('inputs').then(function(inputs){
            this.inputs = inputs
        })
       
    })

     //CP Carga de citas
     it('Carga de citas', function(){

        //Llamar rutina rutinaCargaCitastxt
        cy.rutinaCargaCitastxt
        (this.param.modulos.planeacion.carga_citas, this.param.archivos.carga_citas_txt_ayvi,this.param.archivos.nume)
        
    })  
    //Fin CP


    //CP evento Entrada
     it('Evento Entrada Ayvi', function(){
        
        //Llamar rutina rutinaEventosFormulario
        cy.rutinaEventosFormulario
        (this.param.modulos.eventos.entrada, this.inputs.inputs_ayvi, this.param.credenciales.credenciales_ayvi.mensaje)

    })   
    //Fin CP evento Entrada


    //CP evento Inicio de carga
     it('Evento Inicio de Carga Ayvi', function(){
       
        //Llamar rutina rutinaEventosListado
        cy.rutinaEventosListado
        (this.param.modulos.eventos.inic_carga, this.inputs.inputs_ayvi, this.param.credenciales.credenciales_ayvi.mensaje)
        
    })
    //Fin CP


    //CP evento Fin de carga
      it('Evento Fin de Carga Ayvi', function(){

        //Llamar rutina rutinaEventosListado
        cy.rutinaEventosListado
        (this.param.modulos.eventos.fin_carga, this.inputs.inputs_ayvi, this.param.credenciales.credenciales_ayvi.mensaje)
        
    })   
    //Fin CP


    //CP evento Documentos
    it('Evento Documentos Ayvi', function(){

        //Llamar rutina rutinaEventosListado
        cy.rutinaEventosListado
        (this.param.modulos.eventos.docs, this.inputs.inputs_ayvi, this.param.credenciales.credenciales_ayvi.mensaje)
        
    }) 
    //Fin CP

    //CP evento Salida
    it('Evento Salida Ayvi', function(){

        //Llamar rutina rutinaEventosListado
        cy.rutinaEventosListado
        (this.param.modulos.eventos.salida, this.inputs.inputs_ayvi, this.param.credenciales.credenciales_ayvi.mensaje)
        
    }) 
    //Fin CP

})