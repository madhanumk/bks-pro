import React, { useEffect, useState } from 'react';

const Preview = () => {
    const [wordAmt, setWordAmt] = useState('');

    useEffect(() => {
      calcAmt();
    }, []);
  
    const toWords = (amount:any) => {
      // Implement or import the toWords function
      // Example: return someConversionFunction(amount);
      // Replace this with your actual implementation
  
      // For example, if toWords is a mock function
      return `Words for ${amount}`;
    };
  
    const calcAmt = () => {
      const amt = "11,446.00"; // You can replace this with your actual data source
      const upperto = toWords(amt);
      const word = upperto.slice(0, 1).toUpperCase() + upperto.slice(1);
      setWordAmt(word);
    };
  

  return (
    <>
    <style
      type="text/css"
      dangerouslySetInnerHTML={{
        __html:
          "\n.style3 {\n\tfont-size: 22px;\n\tfont-weight: bold;\n}\n\ntable td, th {\n\tfont-size: 13px;\n}\n"
      }}
    />
    <table width={800} border={0} cellSpacing={3} cellPadding={3}>
      <tbody>
        <tr style={{ height: 100 }}>
          <td colSpan={2}>
            <table width={800} border={1} cellSpacing={0} cellPadding={5}>
              <tbody>
                <tr>
                  <td width="9%" align="left" valign="middle">
                    <img src="https://civiltechnolab.in/new_app/techno/images/logo_3.jpg" />
                  </td>
                  <td width="82%" align="center" valign="middle">
                    <span className="style3">
                      CIVIL TECHNO LAB PRIVATE LIMITED
                      <br /> AN ISO 9001:2008 CERTIFIED LAB
                    </span>
                    <br /> All Building Material Testing and Building Repair
                    Consultancy
                    <br />
                    GSTIN : 33AAFCC7634Q1Z7
                  </td>
                  <td width="5%">
                    <img
                      src="https://civiltechnolab.in/new_app/techno/images/logo_1.jpg"
                      alt="logo"
                    />
                  </td>
                  <td width="4%" align="right" valign="middle">
                    <img
                      src="https://civiltechnolab.in/new_app/techno/images/logo_2.jpg"
                      alt="logo2"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td style={{ textAlign: "center" }} colSpan={2}>
            <h2>INVOICE</h2>
          </td>
        </tr>
        <tr>
          <td>
            Date : 06-09-2023
            <br />
            Bill No : 01422
          </td>
          <td>
            <ul style={{ listStyleType: "circle" }}>
              <li>Original for Receipient</li>
              <li>Duplicate for Supplier Transporter</li>
              <li>Triplicate for Supplier</li>
            </ul>
          </td>
        </tr>
        <tr>
          <td>
            M/s MCR Construction,15, Raja Street, Perundurai-638052,
            <br />
            Erode, Tamilnadu
            <br />
          </td>
          <td>
            Code : 33
            <br />
            Place of Testing : Tamilnadu
            <br />
            GSTIN/UIN : 33AAZFM9314N1ZG
            <br />
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <b style={{ textAlign: "left" }}>
              PROJECT : M/s KG (T &amp; C.Dev), Kadri Mills Precast Plant Site,
              Ondipdur{" "}
            </b>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <table width={800} border={1} cellSpacing={0} cellPadding={5}>
              <tbody>
                <tr>
                  <th style={{width:"50px"}}>S.No</th>
                  <th style={{width:"50px"}}>Name of Test</th>
                  <th style={{width:"50px"}}>Qty</th>
                  <th style={{width:"100px"}}>Rate/Sample(INR)</th>
                  <th style={{width:"100px"}}>Amount(INR)</th>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>1</td>
                  <td>
                    <i>Soil - Compaction Factor </i>-<b>Compaction</b>
                  </td>
                  <td style={{ textAlign: "center" }}>6</td>
                  <td style={{ textAlign: "right" }}>1,500.00 </td>
                  <td style={{ textAlign: "right" }}>9,000.00 </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>2</td>
                  <td>
                    <i>Transportation </i>-<b>Taxi </b>
                  </td>
                  <td style={{ textAlign: "center" }}>1</td>
                  <td style={{ textAlign: "right" }}>700.00 </td>
                  <td style={{ textAlign: "right" }}>700.00 </td>
                </tr>
                <tr>
                  <td colSpan={5} id="" style={{ textAlign: "center" }}>
                    GST 18%
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }} />
                  <td>Add : CGST @ 9.00 % </td>
                  <td style={{ textAlign: "center" }}>-</td>
                  <td style={{ textAlign: "center" }}>-</td>
                  <td style={{ textAlign: "right" }}>873.00 </td>
                </tr>
                <tr>
                  {" "}
                  <td style={{ textAlign: "center" }} />
                  <td>Add : SGST @ 9.00 % </td>
                  <td style={{ textAlign: "center" }}>-</td>
                  <td style={{ textAlign: "center" }}>-</td>
                  <td style={{ textAlign: "right" }}>873.00 </td>
                </tr>
                <tr></tr>
                <tr>
                  <td colSpan={2} id="" />
                  <td colSpan={2} style={{ textAlign: "right" }}>
                    Total Rs.
                  </td>
                  <td style={{ textAlign: "right", fontWeight: "bold" }}>
                    11,446.00{" "}
                    <input
                      type="hidden"
                      id="amt"
                      name="amt"
                      defaultValue="11,446.00"
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan={4} id="words_amt">
                    11,446.00{" "}
                    <input
                      type="hidden"
                      id="amt"
                      name="amt"
                      defaultValue="11,446.00"
                    />
                  </td>
                  <td>E &amp; OE</td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td colSpan={2}>
            <table width={800} border={1} cellSpacing={0} cellPadding={5}>
              <tbody>
                <tr>
                  <th rowSpan={2}>HAN/SAC</th>
                  <th rowSpan={2}>Taxable Value</th>
                  <th colSpan={2}>Central Tax</th>
                  <th colSpan={2}>State Tax</th>
                </tr>
                <tr>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
                <tr style={{ textAlign: "right" }}>
                  <th>998346</th>
                  <td>9,700.00</td>
                  <td>9.00%</td>
                  <td>873.00</td>
                  <td>9.00%</td>
                  <td>873.00</td>
                </tr>
                <tr style={{ textAlign: "right", fontWeight: "bold" }}>
                  <th>Total</th>
                  <td>9,700.00</td>
                  <td />
                  <td>873.00</td>
                  <td />
                  <td>873.00</td>
                </tr>
                <tr>
                  <td colSpan={6} id="words_amt2">
                    11,446.00{" "}
                    <input
                      type="hidden"
                      id="amt"
                      name="amt"
                      defaultValue="11,446.00"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table width={800} border={0} cellSpacing={3} cellPadding={3}>
      <tbody>
        <tr>
          <td width="55%">
            No.12/26, Thandhai Periyar Nagar 2nd St,Sowripalayam To
            Masakkalipalayam Road,
            <br /> Sowripalayam,Coimbatore-641048. Ph : 0422 - 2575903
            <br /> Mobile: 9842234561 / 9382574564 / 9626783884.
            <br /> <i>Email : civiltechnolab@gmail.com </i>
            <br /> <i>Website : www.civiltechnolab.in </i>
            <p>
              BANK DETAILS: Civiltechnolab P Ltd, <br />
              Ac/No: 62371331494, Branch: SBI, KALAPATTI, IFSC CODE: SBIN0021798.
            </p>
          </td>
          <td width="" style={{ textAlign: "center" }}>
            <img
              src="images/qr_code_invoice/qr_invoice4556.png"
              width="100%"
              align="center"
              
            />
          </td>
          <td width="25%" style={{ textAlign: "right" }}>
            <b>
              <br /> CIVIL TECHNO LAB Pvt Ltd
              <br />
              <br /> <br /> <br /> <br />{" "}
              <b style={{ textAlign: "right" }}>S.CHANDRASEKAR.,ME.,</b>
              <br />
              TECHNICAL DIRECTOR
            </b>
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <div style={{ textAlign: "center" }}>
              <u>Declaration:-</u>
              <br /> We declare that this invoice shows the actual price of the
              Test Services described and that all particulars are true and
              correct. <br /> <br />
            </div>
            <div style={{ textAlign: "center" }}>
              SUBJECT TO COIMBATORE JURISDICTION
              <br /> This is computer Generated Invoice.
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </>
  
  );
};

export default Preview;
