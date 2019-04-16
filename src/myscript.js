
function isPullRequestPage() {
    const currentUrl = window.location.toString();
    const pattern = new RegExp('https://github.com/[\\.\\w\\d-]+/[\\.\\w\\d-]+/pull/[\\d]+');
    return pattern.test(currentUrl);
}

function isMockitoProject() {
    const currentUrl = window.location.toString();
    const pattern = new RegExp('https://github.com/mockito/mockito/pull/[\\d]+');
    return pattern.test(currentUrl);
}

function start() {
    if (isPullRequestPage()) {
        console.log("Pull Request page");
        const inputTitleField = $('#merge_title_field');
        const commentTextArea = $('#merge_message_field');
        const ciSkipButton = '<button type="button" class="btn shipkit-ci-skip" style="margin-right: 12px"' +
            'title="Don\'t trigger a build!">[ci skip]</button>';
        const ciSkipReleaseButton = '<button type="button" class="btn shipkit-skip-release" style="margin-right: 12px"' +
            'title="Artifacts will be not released. Also tag, release notes, version bump etc. will be NOT created/executed."' +
            '>[ci skip-release]</button>';
        const ciSkipComparePublicationButton = '<button type="button" class="btn shipkit-skip-compare-publications" ' +
            'style="margin-right: 12px" title="Skip comparing publications to force release"' +
            '>[ci skip-compare-publications]</button>';
        if(isMockitoProject()) {
            const ciMavenCentralReleaseButton = '<button type="button" class="btn shipkit-maven-central-release"' +
                'title="Release to Maven Central">[ci maven-central-release]</button>';
            inputTitleField.after(ciMavenCentralReleaseButton);
        }
        inputTitleField.after(ciSkipComparePublicationButton);
        inputTitleField.after(ciSkipReleaseButton);
        inputTitleField.after(ciSkipButton);

        $('.shipkit-ci-skip').click(function () {
            commentTextArea.append("[ci skip]");
        });
        $('.shipkit-skip-release').click(function () {
            commentTextArea.append("[ci skip-release]");
        });
        $('.shipkit-skip-compare-publications').click(function () {
            commentTextArea.append("[ci skip-compare-publications]");
        });
        $('.shipkit-maven-central-release').click(function () {
            commentTextArea.append("[ci maven-central-release]");
        });
    }
}

start();
