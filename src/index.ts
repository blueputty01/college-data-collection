const axios = require('axios');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
require('dotenv').config();

const colleges = [
  'https://student.naviance.com/colleges/profile/4114ab3f-cf42-4430-bbb8-b8a6c93497a0/Overview',
  'https://student.naviance.com/colleges/profile/06d85bf7-4562-450f-b05d-9a37842890ca/Overview',
  'https://student.naviance.com/colleges/profile/9f1e2181-78a5-4c6a-b21f-b0c8f0036d5d/Overview',
  'https://student.naviance.com/colleges/profile/4c5420a3-c9c1-4a8b-8a5f-d47d428f5af3/Overview',
  'https://student.naviance.com/colleges/profile/e48c4a95-0fe0-49d3-a648-e051808f1126/Overview',
  'https://student.naviance.com/colleges/profile/08a300b2-b1a6-415b-963a-05262d2aa206/Overview',
  'https://student.naviance.com/colleges/profile/c4f67518-1874-40b2-8143-ab66627bf6dc/Overview',
  'https://student.naviance.com/colleges/profile/e883594c-dc4c-4457-bb05-89a9d918c74e/Overview',
  'https://student.naviance.com/colleges/profile/cd02bf48-5a7d-4256-b9b1-289ad90b7504/Overview',
  'https://student.naviance.com/colleges/profile/d7ef1508-1443-4d36-bbf3-8fe4966a9f5e/Overview',
  'https://student.naviance.com/colleges/profile/5d760691-a37d-4d5b-a5fa-d648bd4cb955/Overview',
  'https://student.naviance.com/colleges/profile/cfd102b1-4d6c-47d5-bf44-48df592c826b/Overview',
  'https://student.naviance.com/colleges/profile/19b41f4c-e20b-4fa7-94e6-c65f57fd9e84/Overview',
  'https://student.naviance.com/colleges/profile/885f2737-46b0-4784-9113-5264e03ce588/Overview',
  'https://student.naviance.com/colleges/profile/d1af09f2-07ec-4622-a611-4cdfee8852d0/Overview',
  'https://student.naviance.com/colleges/profile/f4e915e5-8f7f-448a-9cfd-74cf526911a8/Overview',
  'https://student.naviance.com/colleges/profile/af34939c-928a-4e67-916b-d3e09d942ee2/Overview',
  'https://student.naviance.com/colleges/profile/6bad2a2e-9120-4b8c-951a-b67469bfc7c2/Overview',
  'https://student.naviance.com/colleges/profile/f530cac6-d0f2-42be-9acb-314465847831/Overview',
  'https://student.naviance.com/colleges/profile/b3543670-e9c3-4c9c-843c-5fc24f390276/Overview',
  'https://student.naviance.com/colleges/profile/43e528e4-20c7-4a23-8e64-4011c1c6f948/Overview',
  'https://student.naviance.com/colleges/profile/63ef7672-bfe5-434d-a3b8-c4708cfc02e1/Overview',
  'https://student.naviance.com/colleges/profile/c531f836-4de3-4fe5-96e6-1cef50cec94c/Overview',
  'https://student.naviance.com/colleges/profile/175644bb-2e13-4906-b9c2-d12b73326a22/Overview',
  'https://student.naviance.com/colleges/profile/32c7cb85-c97b-4286-ac51-077257bb0735/Overview',
  'https://student.naviance.com/colleges/profile/8a2b939d-c4cd-4bba-acfd-3d06e8d470a4/Overview',
  'https://student.naviance.com/colleges/profile/3014b865-92d6-41ba-a2b4-64d0f9fd7693/Overview',
];

const getUUID = (url: string): string => {
  const [uuid] =
    url.match('[\\d\\w]{8}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{4}-[\\d\\w]{12}') ??
    [];
  return uuid;
};

const getHobsonsId = (uuid: string): Promise<string> => {
  var config = {
    method: 'get',
    url: `https://blue-ridge-api.naviance.com/college/uuid/${uuid}`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const promise = new Promise<string>((resolve, reject) => {
    axios(config)
      .then((response: any) => {
        const res = response.data as UUIDResponse;
        resolve(res.hobsonsId.toString());
      })
      .catch(function (error: any) {
        reject(error);
      });
  });

  return promise;
};

const getCollegeProfile = (id: string): Promise<FullProfile> => {
  var config = {
    method: 'get',
    url: `https://blue-ridge-api.naviance.com/collegeprofile/${id}`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const promise = new Promise<FullProfile>((resolve, reject) => {
    axios(config)
      .then((response: any) => {
        const { fullProfile } = response.data as StatResponse;
        resolve(fullProfile);
      })
      .catch(function (error: any) {
        reject(error);
      });
  });

  return promise;
};

const getAppStats = (uuid: string): Promise<AppStatistics> => {
  var config = {
    method: 'get',
    url: `https://blue-ridge-api.naviance.com/application-statistics/uuid/${uuid}`,
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const promise = new Promise<AppStatistics>((resolve, reject) => {
    axios(config)
      .then((response: any) => {
        const data = response.data as AppStatistics;
        resolve(data);
      })
      .catch(function (error: any) {
        reject(error);
      });
  });

  return promise;
};

const getInfoFromUrl = async (url: string) => {
  const uuid = getUUID(url);
  const apps = await getAppStats(uuid);
  const id = await getHobsonsId(uuid);
  const profile = await getCollegeProfile(id);
  return { profile, apps, url };
};

const scrubStats = ({
  url,
  apps,
  profile,
}: {
  apps: AppStatistics;
  profile: FullProfile;
  url: string;
}) => {
  const studentBody = profile.studentbody.field_he_studentbodyid_ref;

  const ratio = studentBody.field_he_studentfacultyratio;
  const undergradSize = studentBody.calc_he_undergraduatesize;

  const maleGradSize = studentBody.field_he_numgradmales;
  const femaleGradSize = studentBody.field_he_numgradfemales;
  const gradSize = maleGradSize + femaleGradSize;

  const totalSize = undergradSize + gradSize;

  const classroomSize = profile.general.field_he_avg_class_size;

  // const admissions =
  //   profile.international_admissions.field_he_intadmissions_ref
  //     .admission_general_us;
  const admissions =
    profile.undergraduate_admissions.field_he_undergradadmission_ref
      .admission_general;

  const received = parseInt(admissions.field_he_applications_received);
  const accepted = parseInt(admissions.field_he_applications_accepted);

  const acceptanceRate = (accepted / received) * 100;
  const roundedRate = Math.round(acceptanceRate * 100) / 100;

  const finance =
    profile.undergraduate_financial_aid.field_he_undergradfinaidid_ref
      .financial_aid_general.field_he_financial_profile;

  const tuition = parseInt(
    finance.find(
      (f) =>
        f.field_he_financialaidprofiletype === 'Avg. Net Price (income >110k)'
    )?.field_he_value ?? '0'
  );

  const citySize = profile.general.field_he_city_size;

  const wwpAccepted = apps.applicationsByYear[2022]?.totalAccepted ?? 0;
  const wwpApplied = apps.applicationsByYear[2022]?.totalApplied ?? 0;

  const wwpRate = Math.round((wwpAccepted / wwpApplied) * 100 * 100) / 100;

  const sat = apps.applicationStatistics.accepted.sat;

  const sat25 = sat.satTotal[25];
  const sat75 = sat.satTotal[75];

  const getDeadline = (month: number) => {
    const deadlineObject = profile.deadlines.find(
      ({ deadline }) => deadline.field_he_month_of_the_deadline === month
    )?.deadline;
    if (deadlineObject) {
      const string = `${deadlineObject?.field_he_day_of_the_deadline}, ${deadlineObject?.field_he_deadlinetype}`;
      return string;
    }
    return '';
  };

  const name = profile.general.field_he_name;
  console.log(name);

  return {
    url,
    name,
    ratio,
    undergradSize,
    totalSize,
    classroomSize,
    acceptanceRate: roundedRate,
    tuition,
    citySize,
    wwpAccepted,
    wwpApplied,
    wwpRate,
    sat25,
    sat75,
    octoberDeadline: getDeadline(10),
    novemberDeadline: getDeadline(11),
    decemberDeadline: getDeadline(12),
    januaryDeadline: getDeadline(1),
  };
};

const main = async () => {
  const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
      { id: 'url', title: 'URL' },
      { id: 'name', title: 'Name' },
      { id: 'ratio', title: 'Faculty-Student Ratio' },
      { id: 'undergradSize', title: 'Undergraduate Size' },
      { id: 'totalSize', title: 'Total Size' },
      { id: 'classroomSize', title: 'Average Classroom Size' },
      { id: 'acceptanceRate', title: 'Acceptance Rate' },
      { id: 'tuition', title: 'Tuition' },
      { id: 'citySize', title: 'City Size' },
      { id: 'wwpAccepted', title: 'Accepted - WWP' },
      { id: 'wwpApplied', title: 'Applied - WWP' },
      { id: 'wwpRate', title: 'Acceptance Rate - WWP' },
      { id: 'sat25', title: 'WWP SAT 25th percentile' },
      { id: 'sat75', title: 'WWP SAT 75th percentile' },
      { id: 'octoberDeadline', title: 'October Deadline' },
      { id: 'novemberDeadline', title: 'November Deadline' },
      { id: 'decemberDeadline', title: 'December Deadline' },
      { id: 'januaryDeadline', title: 'January Deadline' },
    ],
  });
  const data = [];

  for await (const url of colleges) {
    const stats = await getInfoFromUrl(url);
    data.push(scrubStats(stats));
  }

  csvWriter
    .writeRecords(data)
    .then(() => console.log('The CSV file was written successfully'));
};

main();
