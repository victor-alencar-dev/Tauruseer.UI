import { Markdown } from '@tauruseer/core';
import { Card } from 'react-bootstrap';

export async function loader() {
  if (process.env.NODE_ENV !== 'development') {
    throw new Response(null, {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return null;
}

const markdownContent = `
# Example Markdown Content

\`\`\`javascript
const greeting = "Hello, world!";
console.log(greeting);
\`\`\`

Some regular text here.

\`\`\`bash
npm install -g @tauruseer/cli
\`\`\`
`;

const MarkdownContentFromAPI =
  "Remediation steps for CVE-2020-28469:\n\n1. Upgrade to the latest version of glob-parent (5.1.2 or later) to ensure that the vulnerability is patched.\n\n2. If upgrading is not possible, you can modify the code to fix the vulnerability. In this case, you need to update the regular expression used to check for strings ending in enclosure containing path separator. The updated regular expression should not allow path separators in the enclosure. Here is an example of how to update the regular expression in ABAP:\n\n```\nDATA(lv_string) = 'some string with enclosure /path/to/enclosure/';\n\nIF REGEX(~'(.*[^/])?(/|^)(\\.\\.\\/)*((\\.\\.)?[^/]+\\/)*[^/]+(\\.[^/]+)?$', lv_string) = abap_true.\n  WRITE 'String is safe';\nELSE.\n  WRITE 'String is vulnerable';\nENDIF.\n```\n\nIn the above code, the regular expression `'(.*[^/])?(/|^)(\\.\\.\\/)*((\\.\\.)?[^/]+\\/)*[^/]+(\\.[^/]+)?$'` has been updated to disallow path separators in the enclosure. The updated regular expression is `'(.*[^/])?(/|^)(\\.\\.\\/)*((\\.\\.)?[^/]+\\/)*[^/]+(\\.[^/]+)?$', lv_string`. \n\n3. It is also recommended to sanitize user input to prevent malicious input from exploiting the vulnerability. This can be done by validating user input and removing any characters that could be used to exploit the vulnerability.";

const MarkdownExampleJava =
  'Sure, here are some code examples for remediation of SQL injection in Java:\n\n1. Use parameterized queries:\n\n```\nString sql = "SELECT * FROM users WHERE username = ?";\nPreparedStatement statement = connection.prepareStatement(sql);\nstatement.setString(1, username);\nResultSet resultSet = statement.executeQuery();\n```\n\nIn this example, we are using a parameterized query to retrieve user data from a database. We are passing the user input (username) as a parameter to the query, rather than concatenating it with the SQL statement.\n\n2. Sanitize user input:\n\n```\nString username = request.getParameter("username");\nString sanitizedUsername = StringEscapeUtils.escapeSql(username);\nString sql = "SELECT * FROM users WHERE username = \'" + sanitizedUsername + "\'";\nStatement statement = connection.createStatement();\nResultSet resultSet = statement.executeQuery(sql);\n```\n\nIn this example, we are sanitizing the user input (username) using the `StringEscapeUtils.escapeSql()` method from the Apache Commons Lang library. This method escapes any special characters in the input string to prevent SQL injection attacks.\n\n3. Use stored procedures:\n\n```\nString sql = "{ call get_user(?) }";\nCallableStatement statement = connection.prepareCall(sql);\nstatement.setString(1, username);\nResultSet resultSet = statement.executeQuery();\n```\n\nIn this example, we are using a stored procedure to retrieve user data from a database. We are passing the user input (username) as a parameter to the stored procedure, rather than executing the SQL statement directly from the Java code.\n\n4. Use an ORM framework:\n\n```\n@Entity\n@Table(name = "users")\npublic class User {\n    @Id\n    @GeneratedValue(strategy = GenerationType.IDENTITY)\n    private Long id;\n    \n    @Column(name = "username")\n    private String username;\n    \n    // getters and setters\n}\n\nCriteriaBuilder builder = session.getCriteriaBuilder();\nCriteriaQuery<User> query = builder.createQuery(User.class);\nRoot<User> root = query.from(User.class);\nquery.where(builder.equal(root.get("username"), username));\nList<User> users = session.createQuery(query).getResultList();\n```\n\nIn this example, we are using Hibernate ORM to retrieve user data from a database. We are using the `CriteriaBuilder` and `CriteriaQuery` APIs to build a query that retrieves user data based on the user input (username).\n\n5. Limit database privileges:\n\n```\nGRANT SELECT, INSERT, UPDATE, DELETE ON users TO myappuser;\n```\n\nIn this example, we are limiting the privileges of the `myappuser` database user to only those required for the application to function. We are granting `SELECT`, `INSERT`, `UPDATE`, and `DELETE` privileges on the `users` table to the `myappuser` user, and nothing else. This reduces the risk of attackers gaining access to sensitive data or executing malicious SQL code.';

const MarkdownExamplePython =
  'SQL injection attacks can also occur in Python when user input is not properly validated or sanitized before being used in SQL queries. To remediate SQL injection attacks in Python, you can use parameterized queries or ORM (Object-Relational Mapping) libraries. \n\nHere are some examples: \n\n1. Parameterized Queries: \n\n```\nimport mysql.connector\n\nmydb = mysql.connector.connect(\n  host="localhost",\n  user="yourusername",\n  password="yourpassword",\n  database="mydatabase"\n)\n\nmycursor = mydb.cursor()\n\nsql = "SELECT * FROM customers WHERE address = %s"\nadr = ("Park Lane 38", )\n\nmycursor.execute(sql, adr)\n\nmyresult = mycursor.fetchall()\n\nfor x in myresult:\n  print(x)\n```\n\nParameterized queries use placeholders for user input, which are later replaced with sanitized values. This prevents SQL injection attacks because the SQL statement is executed separately from the user input.\n\n2. ORM Libraries:\n\n```\nfrom sqlalchemy.orm import Session\nfrom sqlalchemy import create_engine\nfrom sqlalchemy.ext.declarative import declarative_base\nfrom sqlalchemy import Column, Integer, String\nfrom sqlalchemy.sql.expression import text\n\nengine = create_engine(\'mysql://scott:tiger@localhost/foo\')\n\nBase = declarative_base()\n\nclass User(Base):\n    __tablename__ = \'users\'\n\n    id = Column(Integer, primary_key=True)\n    name = Column(String(50))\n    password = Column(String(12))\n\n    def __repr__(self):\n        return "<User(name=\'%s\', password=\'%s\')>" % (\n                             self.name, self.password)\n\nsession = Session(bind=engine)\n\nuser = session.query(User).filter(text("name=:name and password=:password")).params(name=username, password=password).all()\n```\n\nORM libraries help prevent SQL injection attacks by abstracting the SQL statements and providing a mapping between the database and the object-oriented programming language. They also typically include built-in mechanisms for sanitizing user input.';

const markdownExampleJavascript =
  'SQL injection attacks occur when an attacker injects malicious SQL code into a web application\'s SQL statement. This can occur when a web application doesn\'t properly validate user input or sanitize data before executing SQL queries. To remediate SQL injection attacks in JavaScript, you can use prepared statements or parameterized queries. \n\nHere are some examples: \n\n1. Prepared Statements: \n\n```\nconst sql = "SELECT * FROM users WHERE username = ? AND password = ?";\nconst values = [username, password];\ndb.query(sql, values, function (err, results) {\n  // handle results\n});\n```\n\nPrepared statements use placeholders for user input, which are later replaced with sanitized values. This prevents SQL injection attacks because the SQL statement is executed separately from the user input. \n\n2. Parameterized Queries: \n\n```\nconst sql = "SELECT * FROM users WHERE username = :username AND password = :password";\nconst values = { username: username, password: password };\ndb.query(sql, values, function (err, results) {\n  // handle results\n});\n```\n\nParameterized queries use named placeholders instead of question marks. This is similar to prepared statements, but can be easier to read and write. \n\nBoth prepared statements and parameterized queries help prevent SQL injection attacks by sanitizing user input and separating it from the SQL statement.';

export default function MarkdownPage() {
  if (process.env.NODE_ENV === 'development') {
    return (
      <div>
        <h1>Markdown</h1>
        <h2>Example Markdown Content</h2>
        <hr />
        <Card style={{ padding: '20px' }}>
          <Markdown markdown={MarkdownContentFromAPI} />
        </Card>
        <h2>Example Markdown Content from API</h2>
        <hr />
        <Card style={{ padding: '20px' }}>
          <Markdown markdown={markdownContent} />
        </Card>
        <h2>Example Markdown Java</h2>
        <hr />
        <Card style={{ padding: '20px' }}>
          <Markdown markdown={MarkdownExampleJava} language="java" />
        </Card>

        <h2>Example Markdown Python</h2>
        <hr />
        <Card style={{ padding: '20px' }}>
          <Markdown markdown={MarkdownExamplePython} language="python" />
        </Card>

        <h2>Example Markdown Javascript</h2>
        <hr />
        <Card style={{ padding: '20px' }}>
          <Markdown markdown={markdownExampleJavascript} language="javascript" />
        </Card>
      </div>
    );
  } else {
    return null;
  }
}
