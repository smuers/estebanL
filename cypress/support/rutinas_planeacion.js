import 'cypress-file-upload';

//Rutina Carga de citas
Cypress.Commands.add("rutinaCargaCitastxt", (url_cargaCitas, fileName, numCitas ) => {
    
    //Preparado para interceptar FeatureConfig de pantalla
    cy.intercept('POST', '**/FeatureConfig').as('clientConfig')
    
    //Ingresar a evento Documentos
    cy.get('.has_sub a[href*="feature_key='+url_cargaCitas+'"]').click({ force: true })
    cy.wait(2000)

    cy.wait('@clientConfig').should(({request,response}) => {
        //expect(request.body).to.include('arg00=140')
    })

     //Obtener nombre de txt
     //var fileName = this.param.archivos.carga_citas_txt_ayvi;
        
     //Cargar txt en input de tipo file
     cy.log(fileName)
     cy.fixture(fileName).then(fileContent =>{
         cy.get('#uploadFileName').attachFile({fileContent, fileName, mimeType: 'text/plain'})
         cy.get('#uploadFileName').click({force: true})
         cy.get('#file_upload_button').click()
     })

     //Validar que haya 0 errores
     cy.get('tbody > :nth-child(1) > :nth-child(5)').contains('0')
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
//Fin rutina eventos por listado