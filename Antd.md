# Ant Design
* https://ant.design
```sh
npm install antd
```

styles/global.scss
```scss
@import '~antd/dist/antd.css';
```
* ❕ `5.4` 버전부터는 `css import` 필요 없다.

Users.js
```js
import { Form, Input, Button } from 'antd';

function Users() {
  const [usersForm] = Form.useForm();
  const [userForm] = Form.useForm();
  const onFinish = (values) => {
    const users = usersForm.getFieldValue('users') || [];
    usersForm.setFieldsValue({
      users: [...users, values]
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const onReset = () => {
    userForm.resetFields();
    userForm.setFieldsValue({
      name: '이순신'
    });
  };
  return (
    <div>
      <h3>Users</h3>
      <hr className="d-block" />
      <div>
        <h4>Read</h4>
        <Form form={usersForm}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Modify</th>
              </tr>
            </thead>
            <tbody>
              <Form.List name="users">
                {(fields, {remove}) => {
                  return fields.map(({ key, name, ...restField }, index) => {
                    return <tr key={key}>
                      <td>
                        <Form.Item name={[name, 'name']} {...restField}>
                          <Input type="text" placeholder="Name" />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item name={[name, 'age']} {...restField}>
                          <Input type="text" placeholder="Age" />
                        </Form.Item>
                      </td>
                      <td>
                        <Form.Item>
                          <Button onClick={() => console.log(usersForm.getFieldValue('users')[index])}>Update</Button>
                          <Button danger onClick={() => remove(index)}>Delete</Button>
                        </Form.Item>
                      </td>
                    </tr>
                  }
                )}}
              </Form.List>
            </tbody>
          </table>
        </Form>
      </div>
      <hr className="d-block" />
      <div>
        <h4>Create</h4>
        <Form
          form={userForm}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          initialValues={{ name: '홍길동', age: 39 }}
          layout="inline"
        >
          <Form.Item name="name" rules={[
            { required: true },
            { pattern: /^[0-9a-z]/, message: '숫자와 소문자만' }
          ]}>
            <Input type="text" placeholder="Name" />
          </Form.Item>
          <Form.Item name="age">
            <Input type="text" placeholder="Age" />
          </Form.Item>
          <Button type="primary" htmlType="submit">Create</Button>
          <Button htmlType="button" onClick={onReset}>Reset</Button>
        </Form>
      </div>
    </div>
  );
}

export default Users;
```
