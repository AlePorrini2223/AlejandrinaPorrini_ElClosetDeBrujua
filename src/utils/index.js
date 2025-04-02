   //toThousand: Función que recibe un número y retorna un string con el número formateado con puntos para separar los miles.
   const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

   //paginator: Función que recibe un array de elementos, una página y la cantidad de elementos por página. Retorna un objeto con la propiedad items que contiene los elementos de la página correspondiente y la propiedad total con la cantidad total de páginas.
   const paginator = (items = [], page = 1, perPage = 10) => {

      const start = (+page - 1) * perPage;
      const end = start + perPage;

      return {
         items : items.slice(start, end),
         total : Math.ceil(items.length / perPage)
      }
   }
   //randomNumber: Función que recibe un número y retorna un número aleatorio entre 1 y el número recibido.
   const randomNumber = (limit) => {
      return Math.floor(Math.random()*limit)+1;
   }

   module.exports =  {
      toThousand,
      paginator,
      randomNumber
   }