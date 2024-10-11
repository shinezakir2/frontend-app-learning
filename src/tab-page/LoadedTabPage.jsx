import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

import { getConfig } from '@edx/frontend-platform';
import { useToggle } from '@openedx/paragon';

import { CourseTabsNavigation } from '../course-tabs';
import { useModel } from '../generic/model-store';
import { AlertList } from '../generic/user-messages';
import StreakModal from '../shared/streak-celebration';
import InstructorToolbar from '../instructor-toolbar';
import useEnrollmentAlert from '../alerts/enrollment-alert';
import useLogistrationAlert from '../alerts/logistration-alert';

import ProductTours from '../product-tours/ProductTours';

const LoadedTabPage = ({
  activeTabSlug,
  children,
  courseId,
  metadataModel,
  unitId,
}) => {
  const {
    celebrations,
    org,
    originalUserIsStaff,
    tabs,
    title,
    verifiedMode,
  } = useModel('courseHomeMeta', courseId);

  // Logistration and enrollment alerts are only really used for the outline tab, but loaded here to put them above
  // breadcrumbs when they are visible.
  const logistrationAlert = useLogistrationAlert(courseId);
  const enrollmentAlert = useEnrollmentAlert(courseId);

  const activeTab = tabs.filter(tab => tab.slug === activeTabSlug)[0];

  const streakLengthToCelebrate = celebrations && celebrations.streakLengthToCelebrate;
  const streakDiscountCouponEnabled = celebrations && celebrations.streakDiscountEnabled && verifiedMode;
  const [isStreakCelebrationOpen,, closeStreakCelebration] = useToggle(streakLengthToCelebrate);

  return (
    <>
      <ProductTours
        activeTab={activeTabSlug}
        courseId={courseId}
        isStreakCelebrationOpen={isStreakCelebrationOpen}
        org={org}
      />
      <Helmet>
        <title>{`${activeTab ? `${activeTab.title} | ` : ''}${title} | ${getConfig().SITE_NAME}`}</title>
      </Helmet>
      
      <StreakModal
        courseId={courseId}
        metadataModel={metadataModel}
        streakLengthToCelebrate={streakLengthToCelebrate}
        isStreakCelebrationOpen={!!isStreakCelebrationOpen}
        closeStreakCelebration={closeStreakCelebration}
        streakDiscountCouponEnabled={streakDiscountCouponEnabled}
        verifiedMode={verifiedMode}
      />
    <main id="main-content" className="css-hboir5">
        <AlertList
          topic="outline"
          className="mx-5 mt-3"
          customAlerts={{
            ...enrollmentAlert,
            ...logistrationAlert,
          }}
              />
        <div class="MuiDrawer-root MuiDrawer-docked css-1wyz3po">
            <div class="MuiPaper-root MuiPaper-elevation MuiPaper-elevation0 MuiDrawer-paper MuiDrawer-paperAnchorRight MuiDrawer-paperAnchorDockedRight css-j3ivl9">
                <div class="css-1ljgbdg">
                    <button class="MuiButtonBase-root MuiToggleButton-root MuiToggleButton-sizeMedium MuiToggleButton-standard css-11q7kml" tabindex="0" type="button" value="value" aria-pressed="false">
                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ChevronRightRoundedIcon"><path d="M9.29 6.71c-.39.39-.39 1.02 0 1.41L13.17 12l-3.88 3.88c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41L10.7 6.7c-.38-.38-1.02-.38-1.41.01"></path></svg>
                        <span class="MuiTouchRipple-root css-w0pj6f">
                        </span>
                    </button>
                    <button class="MuiButtonBase-root MuiToggleButton-root MuiToggleButton-sizeMedium MuiToggleButton-standard css-jxmvg4" tabindex="0" type="button" value="toggle" aria-pressed="false">
                        <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-vubbuv" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ChevronLeftRoundedIcon"><path d="M14.71 6.71a.9959.9959 0 0 0-1.41 0L8.71 11.3c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L10.83 12l3.88-3.88c.39-.39.38-1.03 0-1.41"></path></svg>
                        <span class="MuiTouchRipple-root css-w0pj6f"></span>
                    </button>
                </div>
                <CourseTabsNavigation tabs={tabs} activeTabSlug={activeTabSlug} />
            </div>
        </div>
        
        <div className="css-fs7fgm">
            <div class="css-deriqb"></div>
          {children}
        </div>
      </main>
    </>
  );
};

LoadedTabPage.propTypes = {
  activeTabSlug: PropTypes.string.isRequired,
  children: PropTypes.node,
  courseId: PropTypes.string.isRequired,
  metadataModel: PropTypes.string,
  unitId: PropTypes.string,
};

LoadedTabPage.defaultProps = {
  children: null,
  metadataModel: 'courseHomeMeta',
  unitId: null,
};

export default LoadedTabPage;
