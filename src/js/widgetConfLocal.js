var WidgetConf = {
    url:  'http://localhost:8084/widget/',
    app:  'ul',
    user: '4',
    id:   $(location).attr('pathname'),
    isVendor: true,
    strings : widgetStrings.value,
    currentLocale : widgetStrings.locale
};