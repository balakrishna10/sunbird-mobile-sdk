import {SunbirdSdk} from './sdk';
import {SdkConfig} from './sdk-config';
import {of} from 'rxjs';
import {Container} from 'inversify';
import {InjectionTokens} from './injection-tokens';

const mockSdkConfig: SdkConfig = {
    platform: 'cordova',
    fileConfig: {
    },
    apiConfig: {
        host: 'some_build_config_BASE_URL',
        user_authentication: {
            redirectUrl: 'some_build_config_OAUTH_REDIRECT_URL',
            authUrl: '/auth/realms/sunbird/protocol/openid-connect',
            mergeUserHost: 'some_build_config_MERGE_ACCOUNT_BASE_URL',
            autoMergeApiPath: '/migrate/user/account'
        },
        api_authentication: {
            mobileAppKey: 'some_build_config_some_build_config_MOBILE_APP_KEY',
            mobileAppSecret: 'some_build_config_MOBILE_APP_SECRET',
            mobileAppConsumer: 'some_build_config_MOBILE_APP_CONSUMER',
            channelId: 'some_build_config_CHANNEL_ID',
            producerId: 'some_build_config_PRODUCER_ID',
            producerUniqueId: 'sunbird.app'
        },
        cached_requests: {
            timeToLive: 2 * 60 * 60 * 1000
        }
    },
    eventsBusConfig: {
        debugMode: true
    },
    dbConfig: {
        dbName: 'GenieServices.db'
    },
    deviceRegisterConfig: {
        apiPath: '/api/v3/device'
    },
    contentServiceConfig: {
        apiPath: '/api/content/v1',
        searchApiPath: '/api/composite/v1',
        contentHeirarchyAPIPath: '/api/course/v1'
    },
    courseServiceConfig: {
        apiPath: '/api/course/v1'
    },
    formServiceConfig: {
        apiPath: '/api/data/v1/form',
        formConfigDirPath: '/data/form',
    },
    frameworkServiceConfig: {
        channelApiPath: '/api/channel/v1',
        frameworkApiPath: '/api/framework/v1',
        frameworkConfigDirPath: '/data/framework',
        channelConfigDirPath: '/data/channel',
        searchOrganizationApiPath: '/api/org/v1',
        systemSettingsDefaultChannelIdKey: 'custodianOrgId'
    },
    profileServiceConfig: {
        profileApiPath: '/api/user/v1',
        profileApiPath_V2: '/api/user/v2',
        tenantApiPath: '/v1/tenant',
        otpApiPath: '/api/otp/v1',
        searchLocationApiPath: '/api/data/v1',
        locationDirPath: '/data/location'
    },
    pageServiceConfig: {
        apiPath: '/api/data/v1',
    },
    appConfig: {
        maxCompatibilityLevel: 4,
        minCompatibilityLevel: 1
    },
    systemSettingsConfig: {
        systemSettingsApiPath: '/api/data/v1',
        systemSettingsDirPath: '/data/system',
    },
    telemetryConfig: {
        apiPath: '/api/data/v1',
        telemetrySyncBandwidth: 200,
        telemetrySyncThreshold: 200,
        telemetryLogMinAllowedOffset: 86400000
    },
    sharedPreferencesConfig: {
    },
    playerConfig: {
        showEndPage: false,
        endPage: [{
            template: 'assessment',
            contentType: ['SelfAssess']
        }],
        splash: {
            webLink: '',
            text: '',
            icon: '',
            bgImage: 'assets/icons/splacebackground_1.png'
        },
        overlay: {
            enableUserSwitcher: false,
            showUser: false
        },
        plugins: [
            {
                id: 'org.sunbird.player.endpage',
                ver: '1.1',
                type: 'plugin'
            }
        ]
    },
    errorLoggerConfig: {
        errorLoggerApiPath: '/api/data/v1/client/logs'
    },
    faqServiceConfig: {
        faqConfigDirPath: '/data/faq'
    }
};

describe('sdk', () => {
    const sdkInstance = SunbirdSdk.instance;

    it('should return a singleton instance', () => {
        expect(SunbirdSdk.instance === sdkInstance);
    });

    describe('init()', () => {
        it('should be able to initialize sdk', (done) => {
            window['device'] = { uuid: 'some_uuid' };

            jest.spyOn(sdkInstance, 'dbService', 'get').mockImplementation( () => {
               return {
                   init: jest.fn(() => Promise.resolve())
               };
            });

            jest.spyOn(sdkInstance, 'appInfo', 'get').mockImplementation( () => {
                return {
                    init: jest.fn(() => Promise.resolve())
                };
            });

            jest.spyOn(sdkInstance, 'frameworkService', 'get').mockImplementation( () => {
                return {
                    preInit: jest.fn(() => of(undefined))
                };
            });

            jest.spyOn(sdkInstance, 'profileService', 'get').mockImplementation( () => {
                return {
                    preInit: jest.fn(() => of(undefined))
                };
            });

            jest.spyOn(sdkInstance, 'apiService', 'get').mockImplementation(() => {
                return {
                    setDefaultApiAuthenticators: jest.fn(() => {}),
                    setDefaultSessionAuthenticators: jest.fn(() => {}),
                    onInit: jest.fn(() => of(undefined))
                };
            });

            jest.spyOn(sdkInstance, 'summarizerService', 'get').mockImplementation(() => {
                return {
                    onInit: jest.fn(() => of(undefined))
                };
            });

            jest.spyOn(sdkInstance, 'errorLoggerService', 'get').mockImplementation(() => {
                return {
                    onInit: jest.fn(() => of(undefined))
                };
            });

            jest.spyOn(sdkInstance, 'eventsBusService', 'get').mockImplementation(() => {
                return {
                    onInit: jest.fn(() => of(undefined))
                };
            });

            jest.spyOn(sdkInstance, 'downloadService', 'get').mockImplementation(() => {
                return {
                    onInit: jest.fn(() => of(undefined))
                };
            });

            jest.spyOn(sdkInstance, 'contentService', 'get').mockImplementation(() => {
                return {
                    onInit: jest.fn(() => of(undefined))
                };
            });

            jest.spyOn(sdkInstance, 'storageService', 'get').mockImplementation(() => {
                return {
                    onInit: jest.fn(() => of(undefined))
                };
            });

            jest.spyOn(sdkInstance, 'telemetryService', 'get').mockImplementation(() => {
                return {
                    onInit: jest.fn(() => of(undefined))
                };
            });

            sdkInstance.init(mockSdkConfig).then(() => {
               done();
            }, (e) => {
                fail(e);
            });
        });
    });

    describe('getters', () => {
        it('should return services for respective getters', () => {
            const mockContainer = new Container();
            spyOn(mockContainer, 'get').and.callFake(() => undefined);
            sdkInstance['_container'] = mockContainer;

            sdkInstance.telemetryService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.TELEMETRY_SERVICE);

            sdkInstance.apiService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.API_SERVICE);

            sdkInstance.appInfo;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.APP_INFO);

            sdkInstance.archiveService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.ARCHIVE_SERVICE);

            sdkInstance.authService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.AUTH_SERVICE);

            sdkInstance.codePushExperimentService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.CODEPUSH_EXPERIMENT_SERVICE);

            sdkInstance.contentFeedbackService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.CONTENT_FEEDBACK_SERVICE);

            sdkInstance.contentService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.CONTENT_SERVICE);

            sdkInstance.courseService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.COURSE_SERVICE);

            sdkInstance.dbService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.DB_SERVICE);

            sdkInstance.deviceInfo;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.DEVICE_INFO);

            sdkInstance.deviceRegisterService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.DEVICE_REGISTER_SERVICE);

            sdkInstance.downloadService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.DOWNLOAD_SERVICE);

            sdkInstance.downloadService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.DOWNLOAD_SERVICE);

            sdkInstance.errorLoggerService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.ERROR_LOGGER_SERVICE);

            sdkInstance.eventsBusService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.EVENTS_BUS_SERVICE);

            sdkInstance.faqService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.FAQ_SERVICE);

            sdkInstance.formService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.FORM_SERVICE);

            sdkInstance.frameworkService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.FRAMEWORK_SERVICE);

            sdkInstance.frameworkUtilService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.FRAMEWORK_UTIL_SERVICE);

            sdkInstance.groupService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.GROUP_SERVICE);

            sdkInstance.keyValueStore;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.KEY_VALUE_STORE);

            sdkInstance.networkInfoService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.NETWORKINFO_SERVICE);

            sdkInstance.networkInfoService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.NETWORKINFO_SERVICE);

            sdkInstance.notificationService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.NOTIFICATION_SERVICE);

            sdkInstance.pageAssembleService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.PAGE_ASSEMBLE_SERVICE);

            sdkInstance.playerService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.PLAYER_SERVICE);

            sdkInstance.profileService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.PROFILE_SERVICE);

            sdkInstance.searchHistoryService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.SEARCH_HISTORY_SERVICE);

            sdkInstance.sharedPreferences;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.SHARED_PREFERENCES);

            sdkInstance.storageService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.STORAGE_SERVICE);

            sdkInstance.summarizerService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.SUMMARIZER_SERVICE);

            sdkInstance.systemSettingsService;
            expect(mockContainer.get).toHaveBeenCalledWith(InjectionTokens.SYSTEM_SETTINGS_SERVICE);
        });
    });
});
