
export interface Recipe {
    _id: string;        
    title: string;            
    time_to_prepare: number;   
    ingredients: Ingredient[]; 
    description: string;       
    author: string;            
    created_date: Date;        
    thumbnail_url?: string;    
  }
  
  export interface Ingredient {
    name: string;              
    quantity: number;        
  }
  