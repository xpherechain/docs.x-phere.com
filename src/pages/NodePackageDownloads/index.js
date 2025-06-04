import React, { useEffect, useState } from "react";
import ArchiveRelease from "./ArchiveRelease";
import CurrentRelease from "./CurrentRelease";
import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";
import "./index.css";

export default function NodePackageDownloads() {
  const [releases, setReleases] = useState([]);
  const [currentRelease, setCurrentRelease] = useState();
  const size = 10;
  const [start, setStart] = useState(0);
  const [showPaginationButton, setShowPaginationButton] = useState(true);
  const [showVersions, setShowVersions] = useState(false);
  const [allVersionsLoaded, setAllVersionsLoaded] = useState(false);

  useEffect(() => {
    fetchReleases();
  }, []);

  const fetchReleases = () => {
    // fetch(
    //   "https://airdrop-api.klaytn.foundation/node/releases?start=" + start,
    //   {
    //     method: "GET",
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((response) => {
    let releasesData = response.data.releases;
    console.log(releasesData, "1");
    let machineTypes = response.data.machineTypes.filter(
      (item) => item.machineType !== "windows"
    );
    let config = response.data.config;
    setReleases([...releases, ...releasesData]);

    let resultFirstRecord;
    if (releasesData && releasesData.length > 0 && start === 0) {
      resultFirstRecord = {
        tagName: releasesData[0].tag_name,
        binaryPrefix: releasesData[0].type,
        githubUrl: config.gitBaseUrls[releasesData[0].type],
        machineTypes: machineTypes,
      };

      setCurrentRelease(resultFirstRecord);
    }
    setStart(start + size);
    setShowPaginationButton(releasesData.length !== 0);
    if (releasesData.length < size) {
      setAllVersionsLoaded(true);
    }
  };

  const handleShowVersionsClick = () => {
    setShowVersions(!showVersions);
    if (!showVersions && !allVersionsLoaded) {
      fetchReleases();
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ border: "0.5px solid", padding: "20px" }}>
        <div style={{ fontSize: "46px", fontWeight: "600" }}>Download XEN</div>
        {currentRelease && (
          <div style={{ fontSize: "20px", fontWeight: "400" }}>
            {" "}
            {currentRelease.tag_name}{" "}
          </div>
        )}
        <p>
          You can download the latest stable release of Xphere for our primary
          platforms below.
        </p>
        {currentRelease && currentRelease.machineTypes ? (
          <Tabs groupId="machineTypes">
            {currentRelease.machineTypes.map((_tab, _index) => (
              <TabItem
                key={_index}
                value={_tab.machineType.toLocaleLowerCase()}
                label={_tab.machineType.toUpperCase()}
                default={_tab.default}
              >
                <CurrentRelease
                  tabConfig={currentRelease.machineTypes.filter(
                    (_machine) => _machine.machineType == _tab.machineType
                  )}
                  releaseData={{
                    tagName: currentRelease.tagName,
                    binaryPrefix: currentRelease.binaryPrefix,
                    githubUrl: currentRelease.githubUrl,
                  }}
                />
              </TabItem>
            ))}
          </Tabs>
        ) : (
          <>
            <div style={{ width: "100%" }}>
              <div style={{ margin: "10px auto", width: "100px" }}>
                <span className="loader"></span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export const isAddArm = (type, machineType, tag_name) => {
  return (
    type === "kaia" &&
    ["rpm", "linux"].includes(machineType) &&
    !["v1.0.0", "v1.0.1", "v1.0.2"].includes(tag_name)
  );
};
const response = {
  data: {
    releases: [
      {
        tag_name: "v0.9.0",
        type: "xphere",
      },
    ],
    machineTypes: [
      {
        machineType: "linux",
        default: false,
        binaryBaseUrls: {},
        gitBaseUrls: {
          xphere: "https://github.com/xpherechain/kaia/",
        },
        config: [
          {
            binaryTitle: "FOR Xphere MAINNET",
            binaryNames: ["xen"],
            binaryFileFormat: "{BINARY_NAME}-{TAG_NAME}-0-linux-amd64.tar.gz",
            baseUrl: "{BINARY_BASE_URL}{TAG_NAME}/{BINARY_FILE_FORMAT}",
            releaseLabel: {
              klaytn: "Cypress Mainnet",
              kaia: "Xphere Mainnet",
            },
            releaseNameFormat: "{BINARY_LABEL} {BINARY_NAME} {TAG_NAME}",
          },
        ],
      },
      // {
      //   machineType: "macos",
      //   default: false,
      //   binaryBaseUrls: {},
      //   gitBaseUrls: {
      //     xphere: "https://github.com/xpherechain/",
      //   },
      //   config: [
      //     {
      //       binaryTitle: "FOR Xphere MAINNET",
      //       binaryNames: ["xen"],
      //       binaryVersion: {
      //         klaytn: "darwin-0.9-amd64",
      //         kaia: "darwin-arm64",
      //       },
      //       binaryFileFormat: "{BINARY_NAME}-{TAG_NAME}.tar.gz",
      //       baseUrl: "{BINARY_BASE_URL}{TAG_NAME}/{BINARY_FILE_FORMAT}",
      //       releaseLabel: {
      //         kaia: "Kaia Mainnet",
      //       },
      //       releaseNameFormat: "{BINARY_LABEL} {BINARY_NAME} {TAG_NAME}",
      //     },
      //   ],
      // },
    ],
    config: {
      binaryBaseUrls: {},
      gitBaseUrls: {
        xphere: "https://github.com/xpherechain/",
      },
    },
  },
};
