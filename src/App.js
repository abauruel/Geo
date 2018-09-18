import React, { Component } from 'react'
import { View, Text, PermissionsAndroid } from 'react-native'
import xelement from 'xelement'

import SoapRequest from 'react-native-soap-request'




class App extends Component{
    state={
            latitude: 0,
            longitude: 0,
            latitudeDelta: 0,
            longitudeDelta: 0,
            codigoUnidade: '01',
            descricao: 'POSTO DE SAÚDE',
            url: 'https://servicos.saude.gov.br/cnes/EstabelecimentoSaudeService/v1r0?wsdl',
            args:{
                name:''
            }
        }
    
    

   

    async requestLocationPermission() {
        const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        const grant = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {title: 'Cool Location App required Location permission',
            message: 'We required Location permission in order to get device location ' +
                'Please grant us.'})
                if(grant===PermissionsAndroid.RESULTS.GRANTED){
                    navigator.geolocation.getCurrentPosition((position)=>{
                        console.log(position.coords.latitude)
                    })
                    console.log()
                    alert("Latitude: "+this.state.latitude+
                        "Longitude: "+this.state.longitude);        
                }else{alert("Você não tem acesso a localização")}

        
    };
    
    componentDidMount(){
        navigator.geolocation.getCurrentPosition((position)=>{
            alert("posição: "+position.coords.latitude)
            console.log(position.coords.latitude)
           // this.setState({ latitude: position.coords.latitude,
           //                 longitude: position.coords.longitude})
            

           this.teste()
           
           //then((response)=>{
             //  console.log(response.xmlResponse)
           
          

        })

        
    }
    
    
    
    async teste(){
        const soapRequest = new SoapRequest({
            security:{
                username:'CNES.PUBLICO',
                password: 'cnes#2015public'
            },
             targetNamespace:[
                  {xmlns:"xmlns:est",url:"http://servicos.saude.gov.br/cnes/v1r0/estabelecimentosaudeservice"},
                  {xmlns:"xmlns:fil",url:"http://servicos.saude.gov.br/wsdl/mensageria/v1r0/filtrolocalizacaoestabelecimentosaude"},
                  {xmlns:"xmlns:loc",url:"http://servicos.saude.gov.br/schema/cnes/v1r0/localizacao"},
                  {xmlns:"xmlns:tip",url:"http://servicos.saude.gov.br/schema/cnes/v1r0/tipounidade" },
                  {xmlns:"xmlns:pag",url:"http://servicos.saude.gov.br/wsdl/mensageria/v1r0/paginacao"},
            ],
            
            commonTypes: 'http://soap.acme.com/2.0/soap-common-types',
            requestURL: 'https://servicos.saude.gov.br/cnes/EstabelecimentoSaudeService/v1r0'

        })

        const xmlRequest = soapRequest.createRequest({
            'est:requestLocalizarEstabelecimentoSaude': {
                'fil:FiltroLocalizacaoEstabelecimentoSaude':{
                    'loc:Localizacao':{
                        'loc:longitude': '-43.179916',
                        'loc:latitude':'-22.901879'
                    },
                    'tip:tipoUnidade':{
                        'tip:codigo':'01',
                        'tip:descricao':'POSTO DE SAÚDE'
                    },
                    'pag:Paginacao':{
                        'pag:posicaoRegistroInicio': '01',
                        'pag:quantidadeRegistrosPorPagina':'10',

                    }
                },
                
              
            }
        })  
        
        const response = await soapRequest.sendRequest()    
        console.log("Teste "+response.xmlResponse)
            
        
        
        
        
        
    }
        

    
   
    render(){
        
        
        
        return(
            <View >
           
                
            </View>
        )
    }
}

export default App