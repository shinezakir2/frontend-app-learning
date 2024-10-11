import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from '@edx/frontend-platform/i18n';
import classNames from 'classnames';

import messages from './messages';
import Tabs from '../generic/tabs/Tabs';
import { CoursewareSearch, CoursewareSearchToggle } from '../course-home/courseware-search';
import { useCoursewareSearchState } from '../course-home/courseware-search/hooks';

const CourseTabsNavigation = ({
  activeTabSlug, className, tabs, intl,
}) => {
  const { show } = useCoursewareSearchState();

  return (
    <div id="courseTabsNavigation" className={classNames('course-tabs-navigation', className)}>
          <div class="css-deriqb">
              <h6 class="MuiTypography-root MuiTypography-h6 MuiTypography-noWrap  css-12nq7o1" aria-label="Preparing for a Job Interview">
                  Preparing for a Job Interview
              </h6>
          </div>
          <hr class="MuiDivider-root MuiDivider-fullWidth css-39bbo6" />
          {tabs.map(({ url, title, slug }) => (
              <div class="MuiBox-root css-hpgf8j">
                  <a className={classNames('MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButton-colorPrimary MuiButton-disableElevation link css-17opvwr', { active: slug === activeTabSlug })} key={slug} tabindex="0" target="_self" href={url}>
                      {title}
                      <span class="MuiTouchRipple-root css-w0pj6f"></span>
                  </a>
              </div>
          ))}
          <hr class="MuiDivider-root MuiDivider-fullWidth css-39bbo6" />
          <hr class="MuiDivider-root MuiDivider-fullWidth css-39bbo6" />

      
    </div>
  );
};

CourseTabsNavigation.propTypes = {
  activeTabSlug: PropTypes.string,
  className: PropTypes.string,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  intl: intlShape.isRequired,
};

CourseTabsNavigation.defaultProps = {
  activeTabSlug: undefined,
  className: null,
};

export default injectIntl(CourseTabsNavigation);
