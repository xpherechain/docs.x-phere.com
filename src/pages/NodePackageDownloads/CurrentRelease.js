import React from "react";
import { isAddArm } from "/src/pages/NodePackageDownloads/index";
import BrowserOnly from "@docusaurus/BrowserOnly";

const CurrentRelease = (props) => {
  const releaseData = props.releaseData;

  const tagName = releaseData?.tagName;
  const binaryPrefix = releaseData?.binaryPrefix;
  const githubUrl = releaseData?.githubUrl;

  if (releaseData && props?.tabConfig && props?.tabConfig.length > 0) {
    const tabConfig = props.tabConfig[0];
    return (
      <>
        <div className="current-release-container">
          {tabConfig.config.map((_config, index) => {
            return (
              <div key={index}>
                <div className="current-release-binary-title">
                  {_config.binaryTitle}
                </div>
                <div className="current-release-binary-names-section">
                  {_config.binaryNames &&
                    _config.binaryNames.map((_binaryName, idx) => {
                      let binaryPrefixValue = _config.binaryPrefixes
                        ? _config.binaryPrefixes[binaryPrefix]
                        : "";
                      let binaryVersionValue = _config.binaryVersion
                        ? _config.binaryVersion[binaryPrefix]
                        : "";
                      let binaryFileformat = _config.binaryFileFormat;
                      binaryFileformat = binaryFileformat.replace(
                        "{BINARY_VERSION}",
                        binaryVersionValue
                      );
                      binaryFileformat = binaryFileformat.replace(
                        "{BINARY_NAME}",
                        _binaryName
                      );
                      binaryFileformat = binaryFileformat.replace(
                        "{TAG_NAME}",
                        tagName
                      );
                      binaryFileformat = binaryFileformat.replace(
                        "{BINARY_PREFIX}",
                        binaryPrefixValue
                      );
                      let binaryBaseUrl =
                        tabConfig.binaryBaseUrls[binaryPrefix];

                      let baseUrl = _config.baseUrl;
                      baseUrl = baseUrl.replace(
                        "{BINARY_BASE_URL}",
                        binaryBaseUrl
                      );
                      // Remove 'v' prefix from tagName for URL
                      const tagNameWithoutV = tagName.replace(/^v/, "");
                      baseUrl = baseUrl.replace("{TAG_NAME}", tagNameWithoutV);
                      baseUrl = baseUrl.replace(
                        "{BINARY_FILE_FORMAT}",
                        binaryFileformat
                      );
                      baseUrl = baseUrl.replace(
                        "{BINARY_PREFIX}",
                        binaryPrefixValue
                      );
                      return (
                        <React.Fragment key={_binaryName + "-" + idx}>
                          <a
                            target="_blank"
                            href={baseUrl}
                            className="current-release-binary-names-section-binary-name"
                          >
                            {binaryFileformat}
                          </a>
                          {isAddArm(
                            releaseData.binaryPrefix,
                            tabConfig.machineType,
                            tagName
                          ) && (
                            <a
                              target="_blank"
                              href={baseUrl
                                .replace("amd64", "arm64")
                                .replace("x86_64", "aarch64")}
                              className="current-release-binary-names-section-binary-name"
                            >
                              {binaryFileformat
                                .replace("amd64", "arm64")
                                .replace("x86_64", "aarch64")}
                            </a>
                          )}
                        </React.Fragment>
                      );
                    })}
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="loader-container">
          <div className="loader-body">
            <span className="loader"></span>
          </div>
        </div>
        {/* <div>1</div> */}
      </>
    );
  }
};

export default CurrentRelease;
