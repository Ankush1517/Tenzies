export default function Die(props){
   
   const styles = {
    backgroundColor: props.held ? "#59e391" : "white" 
   }
   return(
    <button 
        style={styles} 
        onClick={props.hold}
    >{props.value}</button>
   )

}