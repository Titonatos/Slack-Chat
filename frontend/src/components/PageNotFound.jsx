//import { useTranslation } from 'react-i18next';

// import getRoutes from '../routes.js';

const NotFound = () => {
  //const { t } = useTranslation();

  return (
    <div className="text-center">
      {/* <h1 className="h4 text-muted">{t('notFound')}</h1> */}
      <h1 className="h4 text-muted">404 Page not found</h1>
      <p className="text-muted">
        {/* {t('youCanGo')}
        {' '} */}
        {<a href="/">Домой</a>
        /* <a href={getRoutes.chatPagePath()}>{t('toHomePage')}</a> */}
      </p>
    </div>
  );
};

export default NotFound;