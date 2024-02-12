export const productTypeTitle = (type: ProductType) => {
   switch (type) {
     case "web":
       return "Visit Website";
     case "extension":
       return "Get Extension";
     case "bot":
       return "Add to Discord";
     default:
       return "Visit Website";
   }
 };
