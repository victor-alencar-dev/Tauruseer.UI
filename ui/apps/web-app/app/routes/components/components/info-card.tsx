import { ExternalService, InfoCard, InfoCardProps } from '@tauruseer/core';
import { LinkAssetDList } from '@tauruseer/ui';

export async function loader() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return null;
}

const contentVariation1: InfoCardProps = {
  header: {
    title: 'Use a key length of at least 2048 bits for RSA cipher algorithm',
    url: 'www.google.com',
    breadcrumbs: [
      {
        url: 'http://google.com',
        copy: 'Ticket #18887',
        icon: ExternalService.JIRA,
      },
      {
        copy: '09/13/2022',
      },
      {
        copy: 'Darrell Steward',
        icon: 'user',
      },
      {
        copy: 'Cameron Williamson',
        icon: 'octagon-check',
      },
    ],
    actions: [
      {
        copy: 'Create Work Item',
        intent: 'create-work-item',
      },
      { copy: 'Accept Risk', intent: 'accept-risk' },
    ],
  },
  state: 'New',
  sideBar: {
    items: [
      {
        type: 'icon',
        icon: ExternalService.Sonar,
        title: 'Source',
        iconColor: '#549DD0',
      },
      {
        type: 'badge',
        icon: 'circle-exclamation',
        copy: 'Blocker',
        title: 'Severity',
        modifier: 'danger',
      },
      {
        type: 'badge',
        copy: 'Resolve as false positive',
        title: 'Status',
      },
      {
        type: 'badge',
        icon: 'bug',
        title: 'Type',
        copy: 'Bug',
      },
      {
        type: 'badge',
        copy: 'csharpsquid:S4426',
        title: 'Rule',
      },
    ],
  },
  table: {
    title: 'title',
    action: {
      copy: 'copy',
      onClick: (selectedState) => {
        console.log(selectedState);
      },
    },
    fields: [
      { field: 'file', title: 'File', size: 'lg' },
      { field: 'line', title: 'Line', size: 'sm' },
      { field: 'detection', title: 'Detection' },
      { field: 'project', title: 'Project' },
      { field: 'product', title: 'product' },
      { field: 'status', title: 'Status' },
      { field: 'trackingItem', title: 'Tracking Item' },
      { field: 'actions', title: 'Actions' },
    ],
    data: [
      {
        id: '1',
        file: {
          title: 'application/public/.../TCPDF_lib.php',
          copyToClipboard: 'application/public/folder/folder/TCPDF_lib.php',
        },
        line: { title: '51' },
        detection: { title: '04/20/22', description: '10 months ago' },
        project: {
          title: 'Gato Hotel',
          referenceLink: 'http://google.com',
        },
        product: {
          title: 'GRC Apps very long name',
          referenceLink: '/products/16',
        },
        status: { badge: { copy: 'New', type: 'status', modifier: 'primary' } },
        trackingItem: { title: 'T-1000', referenceLink: 'http://google.com' },
        actions: {
          buttons: [
            {
              icon: 'file-plus',
              color: '#4231B4',
              callback: () => {},
              tooltip: 'Create work item',
            },
            {
              icon: 'triangle-exclamation',
              color: '#DB4A4A',
              callback: () => {},
              tooltip: 'Accept risk',
            },
          ],
        },
      },
      {
        id: '2',
        file: {
          title: 'application/public/.../TCPDF_lib.php',
          copyToClipboard: 'application/public/folder/folder/TCPDF_lib.php',
        },
        line: { title: '51' },
        detection: { title: '04/20/22', description: '10 months ago' },
        project: {
          title: 'Gato Hotel',
          referenceLink: 'http://google.com',
        },
        product: {
          title: 'GRC Apps very long name',
          referenceLink: '/products/16',
        },
        status: { badge: { copy: 'New', type: 'status', modifier: 'primary' } },
        trackingItem: { title: 'T-1000', referenceLink: 'http://google.com' },
        actions: {
          buttons: [
            {
              icon: 'file-plus',
              color: '#4231B4',
              callback: () => {},
              tooltip: 'Create work item',
            },
            {
              icon: 'triangle-exclamation',
              color: '#DB4A4A',
              callback: () => {},
              tooltip: 'Accept risk',
            },
          ],
        },
      },
      {
        id: '3',
        file: {
          title: 'application/public/.../TCPDF_lib.php',
          copyToClipboard: 'application/public/folder/folder/TCPDF_lib.php',
        },
        line: { title: '51' },
        detection: { title: '04/20/22', description: '10 months ago' },
        project: {
          title: 'Gato Hotel',
          referenceLink: 'http://google.com',
        },
        product: {
          title: 'GRC Apps very long name',
          referenceLink: '/products/16',
        },
        status: { badge: { copy: 'New', type: 'status', modifier: 'primary' } },
        trackingItem: { title: 'T-1000', referenceLink: 'http://google.com' },
        actions: {
          buttons: [
            {
              icon: 'file-plus',
              color: '#4231B4',
              callback: () => {},
              tooltip: 'Create work item',
            },
            {
              icon: 'triangle-exclamation',
              color: '#DB4A4A',
              callback: () => {},
              tooltip: 'Accept risk',
            },
          ],
        },
      },
      {
        id: '4',
        file: {
          title: 'bapplication/public/.../TCPDF_lib.php',
          copyToClipboard: 'application/public/folder/folder/TCPDF_lib.php',
        },
        line: { title: '51' },
        detection: { title: '04/20/22', description: '10 months ago' },
        project: {
          title: 'Gato Hotel',
          referenceLink: 'http://google.com',
        },
        product: {
          title: 'GRC Apps very long name',
          referenceLink: '/products/16',
        },
        status: { badge: { copy: 'New', type: 'status', modifier: 'primary' } },
        trackingItem: { title: 'T-1000', referenceLink: 'http://google.com' },
        actions: {
          buttons: [
            {
              icon: 'file-plus',
              color: '#4231B4',
              callback: () => {},
              tooltip: 'Create work item',
            },
            {
              icon: 'triangle-exclamation',
              color: '#DB4A4A',
              callback: () => {},
              tooltip: 'Accept risk',
            },
          ],
        },
      },
      {
        id: '5',
        file: {
          title: 'xapplication/public/.../TCPDF_lib.php',
          copyToClipboard: 'application/public/folder/folder/TCPDF_lib.php',
        },
        line: { title: '51' },
        detection: { title: '04/20/22', description: '10 months ago' },
        project: {
          title: 'Gato Hotel',
          referenceLink: 'http://google.com',
        },
        product: {
          title: 'GRC Apps very long name',
          referenceLink: '/products/16',
        },
        status: { badge: { copy: 'New', type: 'status', modifier: 'primary' } },
        trackingItem: { title: 'T-1000', referenceLink: 'http://google.com' },
        actions: {
          buttons: [
            {
              icon: 'file-plus',
              color: '#4231B4',
              callback: () => {},
              tooltip: 'Create work item',
            },
            {
              icon: 'triangle-exclamation',
              color: '#DB4A4A',
              callback: () => {},
              tooltip: 'Accept risk',
            },
          ],
        },
      },
      {
        id: '6',
        file: {
          title: '4application/public/.../TCPDF_lib.php',
          copyToClipboard: 'application/public/folder/folder/TCPDF_lib.php',
        },
        line: { title: '51' },
        detection: { title: '04/20/22', description: '10 months ago' },
        project: {
          title: 'Gato Hotel',
          referenceLink: 'http://google.com',
        },
        product: {
          title: 'GRC Apps very long name',
          referenceLink: '/products/16',
        },
        status: { badge: { copy: 'New', type: 'status', modifier: 'primary' } },
        trackingItem: { title: 'T-1000', referenceLink: 'http://google.com' },
        actions: {
          buttons: [
            {
              icon: 'file-plus',
              color: '#4231B4',
              callback: () => {},
              tooltip: 'Create work item',
            },
            {
              icon: 'triangle-exclamation',
              color: '#DB4A4A',
              callback: () => {},
              tooltip: 'Accept risk',
            },
          ],
        },
      },
      {
        id: '7',
        file: {
          title: '1application/public/.../TCPDF_lib.php',
          copyToClipboard: 'application/public/folder/folder/TCPDF_lib.php',
        },
        line: { title: '51' },
        detection: { title: '04/20/22', description: '10 months ago' },
        project: {
          title: 'Gato Hotel',
          referenceLink: 'http://google.com',
        },
        product: {
          title: 'GRC Apps very long name',
          referenceLink: '/products/16',
        },
        status: { badge: { copy: 'New', type: 'status', modifier: 'primary' } },
        trackingItem: { title: 'T-1000', referenceLink: 'http://google.com' },
        actions: {
          buttons: [
            {
              icon: 'file-plus',
              color: '#4231B4',
              callback: () => {},
              tooltip: 'Create work item',
            },
            {
              icon: 'triangle-exclamation',
              color: '#DB4A4A',
              callback: () => {},
              tooltip: 'Accept risk',
            },
          ],
        },
      },
      {
        id: '8',
        file: {
          title: 'application/public/.../TCPDF_lib.php',
          copyToClipboard: 'application/public/folder/folder/TCPDF_lib.php',
        },
        line: { title: '51' },
        detection: { title: '04/20/22', description: '10 months ago' },
        project: {
          title: 'Gato Hotel',
          referenceLink: 'http://google.com',
        },
        product: {
          title: 'GRC Apps very long name',
          referenceLink: '/products/16',
        },
        status: { badge: { copy: 'New', type: 'status', modifier: 'primary' } },
        trackingItem: { title: 'T-1000', referenceLink: 'http://google.com' },
        actions: {
          buttons: [
            {
              icon: 'file-plus',
              color: '#4231B4',
              callback: () => {},
              tooltip: 'Create work item',
            },
            {
              icon: 'triangle-exclamation',
              color: '#DB4A4A',
              callback: () => {},
              tooltip: 'Accept risk',
            },
          ],
        },
      },
      {
        id: '9',
        file: {
          title: 'application/public/.../TCPDF_lib.php',
          copyToClipboard: 'application/public/folder/folder/TCPDF_lib.php',
        },
        line: { title: '51' },
        detection: { title: '04/20/22', description: '10 months ago' },
        project: {
          title: 'Gato Hotel',
          referenceLink: 'http://google.com',
        },
        product: {
          title: 'GRC Apps very long name',
          referenceLink: '/products/16',
        },
        status: { badge: { copy: 'New', type: 'status', modifier: 'primary' } },
        trackingItem: { title: 'T-1000', referenceLink: 'http://google.com' },
        actions: {
          buttons: [
            {
              icon: 'file-plus',
              color: '#4231B4',
              callback: () => {},
              tooltip: 'Create work item',
            },
            {
              icon: 'triangle-exclamation',
              color: '#DB4A4A',
              callback: () => {},
              tooltip: 'Accept risk',
            },
          ],
        },
      },
    ],
  },
  references: {
    items: [
      {
        copy: 'reference A',
        url: 'www.google.com',
        description: 'description',
      },
      {
        copy: 'reference A',
        url: 'www.google.com',
        description: 'description',
      },
      {
        copy: 'reference A',
        url: 'www.google.com',
        description: 'description',
      },
      {
        copy: 'reference A',
        url: 'www.google.com',
        description: 'description',
      },
      {
        copy: 'reference A',
        url: 'www.google.com',
        description: 'description',
      },
    ],
  },
  textbox: {
    html: `<p>Most of cryptographic systems require a sufficient key size to be robust against brute-force attacks.</p>
    <p><a href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar2.pdf">NIST recommendations</a> will be checked for these
    use-cases:</p>
    <p><strong>Digital Signature Generation</strong> and <strong>Verification:</strong></p>
    <ul>
      <li> p ≥ 2048 AND q ≥ 224 for DSA (<code>p</code> is key length and <code>q</code> the modulus length) </li>
      <li> n ≥ 2048 for RSA (<code>n</code> is the key length) </li>
    </ul>
    <p><strong>Key Agreement</strong>:</p>
    <ul>
      <li> p ≥ 2048 AND q ≥ 224 for DH and MQV </li>
      <li> n ≥ 224 for ECDH and ECMQV (Examples: <code>secp192r1</code> is a non-compliant curve (<code>n</code> &lt; 224) but <code>secp224k1</code> is
      compliant (<code>n</code> &gt;= 224)) </li>
    </ul>
    <p><strong>Symmetric keys</strong>:</p>
    <ul>
      <li> key length ≥ 128 bits </li>
    </ul>
    <p>This rule will not raise issues for ciphers that are considered weak (no matter the key size) like <code>DES</code>, <code>Blowfish</code>.</p>
    <h2>Noncompliant Code Example</h2>
    <pre>
    using System;
    using System.Security.Cryptography;

    namespace MyLibrary
    {
        public class MyCryptoClass
        {
            static void Main()
            {
                var dsa1 = new DSACryptoServiceProvider(); // Noncompliant - default key size is 1024
                dsa1.KeySize = 2048; // Noncompliant - the setter does not update the underlying key size for the DSACryptoServiceProvider class

                var dsa2 = new DSACryptoServiceProvider(2048); // Noncompliant - cannot create DSACryptoServiceProvider with a key size bigger than 1024

                var rsa1 = new RSACryptoServiceProvider(); // Noncompliant - default key size is 1024
                rsa1.KeySize = 2048; // Noncompliant - the setter does not update the underlying key size for the RSACryptoServiceProvider class

                var rsa2 = new RSACng(1024); // Noncompliant

                // ...
            }
        }
    }
    </pre>
    <p>KeySize property of DSACryptoServiceProvider and RSACryptoServiceProvider does not change the value of underlying KeySize for the algorithm.
    Property setter is ignored without error and KeySize can be changed only by using constructor overload. See:</p>
    <ul>
      <li> <a
      href="https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.dsacryptoserviceprovider.keysize">DSACryptoServiceProvider.KeySize
      Property</a> </li>
      <li> <a
      href="https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.rsacryptoserviceprovider.keysize">RSACryptoServiceProvider.KeySize
      Property</a> </li>
    </ul>
    <h2>Compliant Solution</h2>
    <pre>
    using System;
    using System.Security.Cryptography;

    namespace MyLibrary
    {
        public class MyCryptoClass
        {
            static void Main()
            {
                var dsa1 = new DSACng(); // Compliant - default key size is 2048
                var dsa2 = new DSACng(2048); // Compliant
                var rsa1 = new RSACryptoServiceProvider(2048); // Compliant
                var rsa2 = new RSACng(); // Compliant - default key size is 2048

                // ...
            }
        }
    }
    </pre>
    <h2>See</h2>
    <ul>
      <li> <a href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/">OWASP Top 10 2021 Category A2</a> - Cryptographic Failures </li>
      <li> <a href="https://www.owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure">OWASP Top 10 2017 Category A3</a> - Sensitive Data
      Exposure </li>
      <li> <a href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration">OWASP Top 10 2017 Category A6</a> - Security
      Misconfiguration </li>
      <li> <a href="https://mobile-security.gitbook.io/masvs/security-requirements/0x08-v3-cryptography_verification_requirements">Mobile AppSec
      Verification Standard</a> - Cryptography Requirements </li>
      <li> <a href="https://owasp.org/www-project-mobile-top-10/2016-risks/m5-insufficient-cryptography">OWASP Mobile Top 10 2016 Category M5</a> -
      Insufficient Cryptography </li>
      <li> <a href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar1.pdf">NIST 800-131A</a> - Recommendation for Transitioning the
      Use of Cryptographic Algorithms and Key Lengths </li>
      <li> <a href="https://cwe.mitre.org/data/definitions/326">MITRE, CWE-326</a> - Inadequate Encryption Strength </li>
    </ul>`,
  },
};

const contentVariation2: InfoCardProps = {
  header: {
    title: 'Use a key length of at least 2048 bits for RSA cipher algorithm',
    url: 'www.google.com',
    actions: [
      {
        copy: 'Create Work Item',
        intent: 'create-work-item',
      },
      { copy: 'Accept Risk', intent: 'accept-risk' },
    ],
  },
  sideBar: {
    items: [
      {
        type: 'icon',
        icon: ExternalService.Sonar,
        title: 'Source',
        iconColor: '#549DD0',
      },
      {
        type: 'badge',
        icon: 'circle-exclamation',
        copy: 'Blocker',
        title: 'Severity',
        modifier: 'danger',
      },
      {
        type: 'badge',
        copy: 'Resolve as false positive',
        title: 'Status',
      },
      {
        type: 'badge',
        icon: 'bug',
        title: 'Type',
        copy: 'Bug',
      },
      {
        type: 'badge',
        copy: 'csharpsquid:S4426',
        title: 'Rule',
      },
    ],
  },
  references: {
    items: [
      {
        copy: 'reference A',
        url: 'www.google.com',
        description: 'description',
      },
      {
        copy: 'reference A',
        url: 'www.google.com',
        description: 'description',
      },
      {
        copy: 'reference A',
        url: 'www.google.com',
        description: 'description',
      },
      {
        copy: 'reference A',
        url: 'www.google.com',
        description: 'description',
      },
      {
        copy: 'reference A',
        url: 'www.google.com',
        description: 'description',
      },
    ],
  },
  textbox: {
    html: `<p>Most of cryptographic systems require a sufficient key size to be robust against brute-force attacks.</p>
    <p><a href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar2.pdf">NIST recommendations</a> will be checked for these
    use-cases:</p>
    <p><strong>Digital Signature Generation</strong> and <strong>Verification:</strong></p>
    <ul>
      <li> p ≥ 2048 AND q ≥ 224 for DSA (<code>p</code> is key length and <code>q</code> the modulus length) </li>
      <li> n ≥ 2048 for RSA (<code>n</code> is the key length) </li>
    </ul>
    <p><strong>Key Agreement</strong>:</p>
    <ul>
      <li> p ≥ 2048 AND q ≥ 224 for DH and MQV </li>
      <li> n ≥ 224 for ECDH and ECMQV (Examples: <code>secp192r1</code> is a non-compliant curve (<code>n</code> &lt; 224) but <code>secp224k1</code> is
      compliant (<code>n</code> &gt;= 224)) </li>
    </ul>
    <p><strong>Symmetric keys</strong>:</p>
    <ul>
      <li> key length ≥ 128 bits </li>
    </ul>
    <p>This rule will not raise issues for ciphers that are considered weak (no matter the key size) like <code>DES</code>, <code>Blowfish</code>.</p>
    <h2>Noncompliant Code Example</h2>
    <pre>
    using System;
    using System.Security.Cryptography;

    namespace MyLibrary
    {
        public class MyCryptoClass
        {
            static void Main()
            {
                var dsa1 = new DSACryptoServiceProvider(); // Noncompliant - default key size is 1024
                dsa1.KeySize = 2048; // Noncompliant - the setter does not update the underlying key size for the DSACryptoServiceProvider class

                var dsa2 = new DSACryptoServiceProvider(2048); // Noncompliant - cannot create DSACryptoServiceProvider with a key size bigger than 1024

                var rsa1 = new RSACryptoServiceProvider(); // Noncompliant - default key size is 1024
                rsa1.KeySize = 2048; // Noncompliant - the setter does not update the underlying key size for the RSACryptoServiceProvider class

                var rsa2 = new RSACng(1024); // Noncompliant

                // ...
            }
        }
    }
    </pre>
    <p>KeySize property of DSACryptoServiceProvider and RSACryptoServiceProvider does not change the value of underlying KeySize for the algorithm.
    Property setter is ignored without error and KeySize can be changed only by using constructor overload. See:</p>
    <ul>
      <li> <a
      href="https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.dsacryptoserviceprovider.keysize">DSACryptoServiceProvider.KeySize
      Property</a> </li>
      <li> <a
      href="https://docs.microsoft.com/en-us/dotnet/api/system.security.cryptography.rsacryptoserviceprovider.keysize">RSACryptoServiceProvider.KeySize
      Property</a> </li>
    </ul>
    <h2>Compliant Solution</h2>
    <pre>
    using System;
    using System.Security.Cryptography;

    namespace MyLibrary
    {
        public class MyCryptoClass
        {
            static void Main()
            {
                var dsa1 = new DSACng(); // Compliant - default key size is 2048
                var dsa2 = new DSACng(2048); // Compliant
                var rsa1 = new RSACryptoServiceProvider(2048); // Compliant
                var rsa2 = new RSACng(); // Compliant - default key size is 2048

                // ...
            }
        }
    }
    </pre>
    <h2>See</h2>
    <ul>
      <li> <a href="https://owasp.org/Top10/A02_2021-Cryptographic_Failures/">OWASP Top 10 2021 Category A2</a> - Cryptographic Failures </li>
      <li> <a href="https://www.owasp.org/www-project-top-ten/2017/A3_2017-Sensitive_Data_Exposure">OWASP Top 10 2017 Category A3</a> - Sensitive Data
      Exposure </li>
      <li> <a href="https://owasp.org/www-project-top-ten/2017/A6_2017-Security_Misconfiguration">OWASP Top 10 2017 Category A6</a> - Security
      Misconfiguration </li>
      <li> <a href="https://mobile-security.gitbook.io/masvs/security-requirements/0x08-v3-cryptography_verification_requirements">Mobile AppSec
      Verification Standard</a> - Cryptography Requirements </li>
      <li> <a href="https://owasp.org/www-project-mobile-top-10/2016-risks/m5-insufficient-cryptography">OWASP Mobile Top 10 2016 Category M5</a> -
      Insufficient Cryptography </li>
      <li> <a href="https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-131Ar1.pdf">NIST 800-131A</a> - Recommendation for Transitioning the
      Use of Cryptographic Algorithms and Key Lengths </li>
      <li> <a href="https://cwe.mitre.org/data/definitions/326">MITRE, CWE-326</a> - Inadequate Encryption Strength </li>
    </ul>`,
  },
};

export default function InfoCardPage() {
  if (process.env.NODE_ENV === 'development') {
    return (
      <div>
        <h1>Info Card</h1>
        <InfoCard content={contentVariation2}></InfoCard>
        <hr />
        <InfoCard content={contentVariation1}></InfoCard>
        <hr />
      </div>
    );
  } else {
    return null;
  }
}

export const links = () => LinkAssetDList;
