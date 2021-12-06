import 'cypress-file-upload';

//Rutina Carga de citas
Cypress.Commands.add("rutinaCargaArchivosTXT", (url_cargaCitas, fileName, numCitas ) => {
    
    //Preparado para interceptar FeatureConfig de pantalla
    cy.intercept('POST', '**/FeatureConfig').as('clientConfig')
    
    //Ingresar a modulo
    cy.get('.has_sub a[href*="feature_key='+url_cargaCitas+'"]').click({ force: true })
    cy.wait(2000)

    cy.wait('@clientConfig').should(({request,response}) => {
        //expect(request.body).to.include('arg00=140')
    })
        
     //Cargar txt en input de tipo file
     cy.log(fileName)
     cy.fixture(fileName).then(fileContent =>{
         cy.get('#uploadFileName').attachFile({fileContent, fileName, mimeType: 'text/plain'})
         cy.get('#uploadFileName').click({force: true})
         cy.get('#file_upload_button').click()
     })

    //Validar que haya 0 errores
    cy.get('tbody > :nth-child(1) > :nth-child(5)').contains('0')
    cy.wait(1000)
/*      cy.get('tbody > :nth-child(1) > :nth-child(5)').contains('0').then((contains) => {
        
        // Comparar que contenido de columna errores sea 0
         if(contains == 0){
              cy.log(contains) 
             var citas = contains
             cy.log('Carga de' +citas + 'citas EXITOSA') 
              cy.log('Prueba de carga de citas correcta, NO EXITOSA')
         
         }else{
             cy.log('Prueba de carga de citas correcta, EXITOSA')
         }
     })  */
})
//Fin rutina Carga de citas


//Rutina Conformador de viajes
Cypress.Commands.add("rutinaConformadorViajes", (url_conformador, array_inputs, msj ) => {

    //Preparado para interceptar FeatureConfig de pantalla
    cy.intercept('POST', '**/FeatureConfig').as('clientConfig')
    
    //Ingresar a modulo
    cy.get('.has_sub a[href*="feature_key='+url_conformador+'"]').click({ force: true })
    cy.wait(2000)

    cy.wait('@clientConfig').should(({request,response}) => {
        //expect(request.body).to.include('arg00=140')

        //Se guarda arreglo de campos encontrados en response
        var campos = response.body.register.event.fields.field;
        
        //Encontrar si hay conductor en el formulario
        campos.forEach((cms) => {

            var campo = cms['name']
            cy.log(campo)
            
            var camp_inp = array_inputs;

            camp_inp.forEach((cms2) => {

                var campo_input = cms2[campo]
                cy.log(campo_input)
            
           
                if(campo=='certificated_driver'){
                    //Ingresar datos en campos de card conductor certificado
                    cy.get('#credential').should('be.visible').type(campo_input)
                    cy.get('#cardautentifier_certified_button').should('be.visible').click()

                }else if(campo=='uncertificated_driver'){
                    //Ingresar datos en campos de card conductor no certificado
                    cy.get('#cardautentifier_uncertified_tab').should('be.visible').click()
                    cy.get('#uncertified_driver_name').should('be.visible').type(campo_input)
                    cy.get('#uncertified_transline_name').type('Recurso Confiable', {force: true})
                    cy.wait(1000)
                    cy.get('#ui-id-6').click()
                    //cy.get('.ui-menu-item > a').eq("Rc").click()
                    cy.get('#cardautentifier_uncertified_button').should('be.visible').click()
                }
            })
        })

        //Llenar campos del formulario
        campos.forEach((cms) => {

            var campo = cms['name']
            cy.log(campo)
            
            if(campo!='certificated_driver' && campo!='uncertificated_driver'){

                var camp_inp = array_inputs;
                cy.log(camp_inp)
                
                camp_inp.forEach((cms2) => {

                    var campo_int_2 = cms2[campo]
                    cy.log(campo_int_2)
                    
                        //Ingresar datos en campos
                    cy.get('#'+campo).should('be.visible').type(campo_int_2)

                })
            }
        })
    })
})
//Fin rutina Conformador de viajes