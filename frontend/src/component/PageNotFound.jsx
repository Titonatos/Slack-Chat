import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import imagePath from '../assets/404.svg';

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center mt-5">
      <img src={imagePath} alt={t('notFoundPage.header')} className="img-fluid" />
      <h1 className="h4 text-muted">{t('notFoundPage.header')}</h1>
      <p className="text-muted">
        {t('notFoundPage.body')}
        {' '}
        <Link to="/">{t('notFoundPage.link')}</Link>
      </p>
    </div>
  );
};

export default NotFound;
