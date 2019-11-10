module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert('idea_categories', [
      {
        id: '424d0478-60e1-4301-8556-6918b9250c28',
        title: 'Saúde',
        description: 'Medicina, Biologia, Farmácia, Veterinário, etc..',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '25e9776c-83fc-490b-a3e1-2e3f5291e419',
        title: 'Educação',
        description: 'Professores, Escolas, Universidades, Cursos, etc..',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '2181a233-cc3f-4f3c-b792-dcd003feeaad',
        title: 'Segurança',
        description: 'Ant-Furto, Ant-Sequestro, Câmeras, Alarmes, etc..',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('idea_categories', null, {});
  },
};
