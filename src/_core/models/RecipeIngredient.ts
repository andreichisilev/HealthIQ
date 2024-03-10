export interface RecipeIngredient {
  idRecipeIngredients: number;
  idRecipe: number;
  recipeName: string;
  recipeInstructions: string;
  cookingTime: number;
  photo_URL: string;
  ingredientName: string;
  ingredientType: string;
  caloriesNOPer100g: number;
  proteinNoPer100g: number;
  carboNoPer100g: number;
  fatsNoPer100g: number;
  grams: number;
}
