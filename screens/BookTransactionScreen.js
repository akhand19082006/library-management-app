import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,TextInput, Image} from 'react-native';
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'
export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
            scannedStudentId:'',
            scannedBookId:''
        }
    }
getCameraPermission = async (Id)=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    
    this.setState({
        hasCameraPermissions:status==="granted ",
        buttonState:Id,
        scanned:false

    });
}
handleBarCodeScan=async({type,data})=>{
    const {buttonState}=this.state
    if(buttonState==="BookId"){
       this.setState({
        scanned:true,
        scannedBookId:data,
        buttonState:'normal'
    }) 
    }
    else if (buttonState==="StudentId"){
        this.setState({
         scanned:true,
         scannedStudentId:data,
         buttonState:'normal'
     }) 
     }

}
handleTransaction =async()=> {

}
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions;
        const buttonState=this.state.buttonState;
        const scanned=this.state.scanned;
        if(buttonState!=="normal" && hasCameraPermissions){
        return(
<BarCodeScanner
onBarCodeScanned={scanned ? undefined : this.handleBarCodeScan}
style={StyleSheet.absoluteFillObject}/>

        )
}
else if (buttonState==="normal"){
    return(

    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View><Image source={require("../assets/booklogo.jpg")} style={{width:200,height:200}}/>
        <Text style={{textAlign:'center',fontSize:30}}>Library</Text>
        </View>
    <View style={styles.inputVeiw}>

    <TextInput style={styles.InputBox} placeholder="Book Id" value={this.state.scannedBookId} />
    <TouchableOpacity style={styles.button} onPress={()=>{this.getCameraPermission("BookId")}} >
    <Text style={styles.displaytext}>Scan</Text>
    </TouchableOpacity>
     </View>

   <View style={styles.inputVeiw}>
        
    <TextInput style={styles.InputBox}
        placeholder="Student Id" value={this.state.scannedStudentId}  />        
        
    <TouchableOpacity style={styles.button} onPress={()=>{this.getCameraPermission("StudentId")}}>
           <Text style={styles.displaytext}>
               
                      Scan 
           </Text>
    </TouchableOpacity> </View>

<TouchableOpacity style={styles.Scanbutton} onPress={async()=>{this.handleTransaction()}}>
<Text style={styles.displaytext}>Submit</Text>
</TouchableOpacity>

     </View>
        
           
          )
    }
}
}      

const styles = StyleSheet.create({
    button:{
     
padding:10,
margin:10,
backgroundColor:"red"


    },
displaytext:{
fontSize:24


},
InputBox:{
width  :200,
height:40,
borderWidth:1.5,
borderRightWidth:0,
fontSize:20

},
inputVeiw:{
    flexDirection:'row',
    margin:20
},
Scanbutton:{
  width:100,
  height:50,
    backgroundColor:"red"
}

})



