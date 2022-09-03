declare global {
    interface Window { 
        XMLHttpRequest: any; 
    }
}
export default global;