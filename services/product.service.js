const {faker} = require('@faker-js/faker');// Por ser la ultima version de faker se llama con Ecma Script 6
const boom = require('@hapi/boom');


class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push(
        {
          id : faker.datatype.uuid(),
          name : faker.commerce.productName(),
          price : parseInt(faker.commerce.price(),10),
          image : faker.image.imageUrl(),
          isBlock : faker.datatype.boolean()
        });
    }
  }

  async create(data){
    const newProduct = {
      id : faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

   find(){
    return new Promise((resolve , reject )=>
    {
      setTimeout(() => {
        resolve(this.products);
      }, 5000);
    });

  }

  // async findOne(id){
  //   const name = this.getTotal();
  //   return this.products.find(item => item.id === id);
  // }
  async findOne(id){

    const product = this.products.find(item => item.id == id);
    if(!product)
    {
      throw boom.notFound('No se pudo encontrar el usuario');
    }
    if(product.isBlock)
    {
      throw boom.conflict('Product is block');
    }

    return product;
  }

  /* En esta funcion utilizamos el spread operator(...), el cual
  sirve para poder fucionar ambos arrays
   */
  async update(id,changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product Not Found');
    }
    const product  = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }


  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw new Error('Prodcut not found');
    }
    this.products.splice(id,1);
    return {id};
  }

}

module.exports = ProductsService;
