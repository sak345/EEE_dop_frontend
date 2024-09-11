const styles = {

  alignItems: window.innerWidth > 600 ? 'center' : 'flex-start',

  navTitleButton: {
    display: 'flex',
    alignItems: 'center', // Align items vertically
    justifyContent: 'center', // Align items horizontally
    height: '100%',
    fontSize: window.innerWidth > 600 ? 32 : 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    textShadow: '1px 1px #ccc',
    backgroundColor: '#f2f2f2',
    padding: window.innerWidth > 600 ? 20 : 10,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 10,
    cursor: 'pointer',

  },

  pageTitle: {
    fontSize: window.innerWidth > 600 ? 32 : 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    textShadow: '1px 1px #ccc',
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: '#d5d0d6'
  },

  nav: {
    backgroundColor: '#01182d',
    borderRadius: 10,
    padding: 0,
    marginRight: 3
  },

  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    listStyleType: 'none',
    margin: 0,
    padding: 0,
  },

  navButton: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#01182d',
    color: '#9ca2ad',
    fontSize: 16,
    fontWeight: 'bold',
    cursor: 'pointer',
  },

  lastChild: {
    marginRight: '100px',
  },

  firstChild: {
    marginLeft: '100px',
  },


  navb: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },

  navLeft: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
    flexGrow: 0.8,
    marginLeft: 15,
  },

  navRight: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '5px',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    margin: 10,
  },

  homeContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },

  dropMenu: {
    marginBottom: 0,

  },

};

export default styles;
