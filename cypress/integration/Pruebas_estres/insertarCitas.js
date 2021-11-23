/// <reference types="Cypress"/>

//Suite de primeros CP
describe('Carca citas manual', function()
{

    beforeEach(() => { 
        
        //Llamar rutina carga de configuración cliente
        //cy.configClient()
        
        //Cargar parametros de parametros.json 
        cy.fixture('estres/estres_parametros').then(function(param){
            this.param = param

            //Llamar rutina login
            cy.login
            (this.param.ambiente.url_amb,this.param.credenciales.credenciales_autozone.user, this.param.credenciales.credenciales_autozone.password)
        })

         //Cargar Inputs de inputs.json
        cy.fixture('estres/estres_inputs').then(function(inputs){
            this.inputs = inputs
        })
       
    })

    //Insertar citas
    it('Carga de citas manual', function(){
        
        //Llamar rutina planeación CCM
         cy.CCitasManual
        (this.param.modulos.planeacion.carga_citas_manual) 

        //cy.get('.has_sub a[href*="feature_key=MANUAL_APPOINTMENT_LOAD"]').click({ force: true })
       
        
        //cy.get('.ui-menu-item').type('be', '9757-Cedis Laredo MTY').click()

            for (var i = 350; i <= 3000; i++) 
            {
               var n = i;
                cy.wait(4000)

                cy.get('#2_sourceplanningplan0datetime_1').type('2021/11/10 09:00')
                cy.get('#7_destiniesdestiny0planningplan0datetime_4').type('2021/11/11 09:10')
                cy.wait(1000)
                cy.get('#src_location_id_label1').type('9757-Cedis Laredo MTY')
                cy.wait(1000)
                cy.get('#ui-id-1[id^="ui-id-"]').click()
                
            
                cy.get('.sequence').type(n)
                cy.get('#dst_location_id_label2').type('9752-Cedis Laredo Tepeji')
                cy.get('#ui-id-2[id^="ui-id-"]').click()
           
                
                cy.get('.shipment').type('EST_V_' + n)
               
                cy.get('.input-sm > :nth-child(2)').click()
                cy.get('#activitynum_lbl_1_1').click()
                cy.wait(2000)
                cy.get('#modal_activitynum_lbl_1_1').type('EST_PD' + n)
                cy.wait(1000)
                cy.get('#btnAgregarSelFabricante').click()
                //cy.wait(3000)
                cy.get('#filters-btn').click()
                cy.wait(2000)
                cy.get('#appointmentFormSuccess > .modal-dialog > .modal-content > .modal-footer > #closeResume').click({ force: true })
                cy.wait(2000)
            }   
 
    })  
    //Fin insertar citas

 

})