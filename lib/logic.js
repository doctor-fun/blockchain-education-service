    /*
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    * http://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    * 

    * 
    */


    /**
     * detectTransferC_C detect transfer
     * @param {token.TokenTransferC_C} tokenTransferC_C - the TokenTransfer transaction
     * @transaction
     */
    function detectTransferC_C(tokenTransferC_C){

        var NS = 'token';
        //触发规则，待定
        if(1){
            
            var factory = getFactory()
            var newAbnormal = factory.newResource(NS,'AbnormalDetection',tokenTransferC_C.transferID);
            newAbnormal.fromUsersEmail = [tokenTransferC_C.from.email,tokenTransferC_C.to.email];
            newAbnormal.auditor = ["admin@email.com"];
            newAbnormal.auditInfo = [0]
            newAbnormal.auditState = 0;
            newAbnormal.punishmentState = 0;
            newAbnormal.abnormalType = 0;
            newAbnormal.transferNum = tokenTransferC_C.transferNum;
            return getAssetRegistry(NS+'.AbnormalDetection').then(function(AbnormalDetectionRegistry){

                return  AbnormalDetectionRegistry.add(newAbnormal);

            })

        }
        
        return 0;

    }


    /**
     * detectTransferC_C detect transfer
     * @param {token.ChangeAbnormal} changeAbnormal - the TokenTransfer transaction
     * @transaction
     */
 async function changeAbnormal(changeAbnormal){

        var NS = 'token';
        const rs = await getAssetRegistry(NS+'.AbnormalDetection');
        const abnoraml = await rs.get(changeAbnormal.abnormalId);
        var len = abnoraml.auditInfo.length;
        abnoraml.auditInfo[len-1] = 1;
        if(!changeAbnormal.isFinish){
            abnoraml.auditor[len] = changeAbnormal.auditor;       
            abnoraml.auditInfo[len] = 0; 
        
            var p = 0;
            if(changeAbnormal.punishmentIds.length!=0){

                //p = await function punishment(){} 
                p = 1;
            }
            abnoraml.punishmentState = p;
            
        }
        return rs.update(abnoraml);
        
        


    }

    /**
     * 
     * @param {token.ReviewTransaction} reviewTransaction - the TokenTransfer transaction
     * @transaction
     */
    async function reviewTransaction(reviewTransaction){


        let results = await query('selectTokenTransferByCompany',
        {"beginDate":reviewTransaction.begin,"endDate":reviewTransaction.end,"company":reviewTransaction.email});
        return results;

    }




    /**
     * A toekn has been transfered
     * @param {token.InitUser} initUser - the TokenTransfer transaction
     * @transaction
     */
    function  inituser(initUser) {
        var factory = getFactory();
        var NS = 'token';
        // create the grower
        var user = factory.newResource(NS, 'User', 'user1@email.com');
        user.accountBalance = 0;

        return getParticipantRegistry(NS + '.User')
            .then(function (UserRegistry) {
                // add the growers
                return UserRegistry.addAll([user]);
            });
    }




    /**
     * A toekn has been transfered
     * @param {token.InitCentralBank} initCentralBank - the TokenTransfer transaction
     * @transaction
     */
    function  initcentralbank(initCentralBank) {
        var factory = getFactory();
        var NS = 'token';
        // create the grower
        var centralbank = factory.newResource(NS, 'CentralBank', 'centralbank@email.com');
        centralbank.accountBalance = 0;
        centralbank.totalIssueToken = 0;

        return getParticipantRegistry(NS + '.CentralBank')
            .then(function (centralbankRegistry) {
                // add the growers
                return centralbankRegistry.addAll([centralbank]);
            });
    }

    /**
     * A toekn has been transfered
     * @param {token.InitCompany} initCompany - the TokenTransfer transaction
     * @transaction
     */
    function  initcompany(initCompany) {
        var factory = getFactory();
        var NS = 'token';
        // create the grower
        var company1 = factory.newResource(NS, 'Company', 'ZjuEducation@email.com');
        company1.accountBalance = 0;
        var company2 = factory.newResource(NS, 'Company', 'mooc@email.com');
        company2.accountBalance = 0;

        return getParticipantRegistry(NS + '.Company')
            .then(function (CompanyRegistry) {
                // add the growers
                return CompanyRegistry.addAll([company1,company2]);
            });
    }

    /**
     * A toekn has been transfered
     * @param {token.InitContract} initContract - the TokenTransfer transaction
     * @transaction
     */
    function  initcontract(initContract) {
        var factory = getFactory();
        var NS = 'token';

        var contract = factory.newResource(NS, 'Contract', 'contract@mooc');
        contract.platformPer = 0.003;
        contract.companyPer = 0.997;

        return getAssetRegistry(NS + '.Contract')
            .then(function (ContractRegistry) {
                // add the growers
                return ContractRegistry.addAll([contract]);
            });
    }


    /**
     * A toekn has been transfered
     * @param {token.InitService} initService - the TokenTransfer transaction
     * @transaction
     */
    function  initservice(initService) {
        var factory = getFactory();
        var NS = 'token';

        var service1 = factory.newResource(NS, 'Service', 'service1@mooc');
        service1.serviceName = '微积分课程';
        service1.servicePrice = 25.5;
        service1.company = factory.newRelationship(NS, 'Company', 'mooc@email.com');
        
        var service2 = factory.newResource(NS, 'Service', 'service2@mooc');
        service2.serviceName = '高数课程';
        service2.servicePrice = 35.5;
        service2.company = factory.newRelationship(NS, 'Company', 'mooc@email.com');
        
        var service3 = factory.newResource(NS, 'Service', 'service3@mooc');
        service3.serviceName = '操作系统课程';
        service3.servicePrice = 20.5;
        service3.company = factory.newRelationship(NS, 'Company', 'mooc@email.com');


        return getAssetRegistry(NS + '.Service')
            .then(function (ServiceRegistry) {
                // add the growers
                return ServiceRegistry.addAll([service2,service3,service1]);
            });
    }







    /**
     * A toekn has been transfered
     * @param {token.IssueToken2} issueToken2 - the TokenTransfer transaction
     * @transaction
     */
    function  issuetoken(issueToken2) {
        var issueBank = issueToken2.issuer;
        var NS = 'token';

        issueBank.totalIssueToken += issueToken2.tokenNum;
        issueBank.accountBalance += issueToken2.tokenNum;

        return getParticipantRegistry(NS + '.CentralBank')
            .then(function (CentralBankRegistry) {
                // update the grower's balance
                return CentralBankRegistry.update(issueBank);
            });
    }


    function initAbnormal(){

        

    }


    /**
     * A toekn has been transfered
     * @param {token.TokenTransferC_C} tokenTransferC_C - the TokenTransfer transaction
     * @transaction
     */
    
    function transfertokenC_C(tokenTransferC_C) {
        var fromCompany = tokenTransferC_C.from;
        var toCompany = tokenTransferC_C.to;
        var transferTokennum = tokenTransferC_C.transferNum;
        var NS = 'token';
        
        if (transferTokennum >= fromCompany.accountBalance) {
            throw new Error('Transfer account should have enough balance.');
        }

        detectTransferC_C(tokenTransferC_C);
        fromCompany.accountBalance -= transferTokennum;
        toCompany.accountBalance += transferTokennum;

        return getParticipantRegistry(NS + '.Company')
            .then(function (CompanyRegistry) {
                // update the grower's balance
                return CompanyRegistry.update(fromCompany);
            })
            .then(function () {
                return getParticipantRegistry(NS + '.Company');
            })
            .then(function (CompanytoRegistry) {
                // update the importer's balance
                return CompanytoRegistry.update(toCompany);
            });
    }
    


    




    /**
     * A toekn has been transfered
     * @param {token.ConfirmSign1B} confirmSign1B - the TokenTransfer transaction
     * @transaction
     */
    function  confirmsign1B(confirmSign1B) {
        var NS = 'token';
        var factory = getFactory();
        var issuetokensign = factory.newResource(NS, 'IssueTokenSign', confirmSign1B.issueTokenSignId);
        issuetokensign.transferNum = confirmSign1B.transferNum;
        issuetokensign.confirmSignR2 = 'N';
        issuetokensign.confirmer1 = confirmSign1B.confirmer1;

        return getAssetRegistry(NS + '.IssueTokenSign')
            .then(function (IssueTokenSignRegistry) {
                // update the grower's balance
                return IssueTokenSignRegistry.addAll([issuetokensign]);
            });
    }


    /**
     * A toekn has been transfered
     * @param {token.ConfirmSign2R} confirmSign2R - the TokenTransfer transaction
     * @transaction
     */
    function  confirmsign2R(confirmSign2R) {
        var NS = 'token';
        var issuetokensign = confirmSign2R.issuetokensign;

        if (issuetokensign.transferNum != confirmSign2R.transferNum) {
            throw new Error('Issue token amount is not same, Please check.');
        }

        if (issuetokensign.confirmSignR2 != 'N') {
            throw new Error('Issue  is aready confirmed by Regulator1.');
        }

        if (issuetokensign.confirmer1 != confirmSign2R.confirmer1) {
            throw new Error('Issue  is not confirmed by This Bank.');
        }

        issuetokensign.confirmSignR2 = 'Y';
        issuetokensign.confirmer1.totalIssueToken += issuetokensign.transferNum;
        issuetokensign.confirmer1.accountBalance += issuetokensign.transferNum;

        return getParticipantRegistry(NS + '.CentralBank')
        .then(function (CentralBankRegistry) {
            // update the grower's balance
            return CentralBankRegistry.update(issuetokensign.confirmer1);
        })
        .then(function() {
            return getAssetRegistry(NS + '.IssueTokenSign');
        })
        .then(function(IssueTokenSignRegistry) {
            // add the shipments
            return IssueTokenSignRegistry.update(issuetokensign);
        });

    }

    /**
     * A toekn has been transfered
     * @param {token.UserRecharge} userRecharge - the userRecharge transaction
     * @transaction
     */
    async function  userrecharge(userRecharge) {
        var NS = 'token';
        var factory = getFactory();
        var usertokenrecharge = factory.newResource(NS, 'UserTokenRecharge', userRecharge.rechargeID);
        usertokenrecharge.tokenNum = userRecharge.tokenNum;
        usertokenrecharge.user = userRecharge.user;
        usertokenrecharge.confirmBank = 'N';

        return getAssetRegistry(NS + '.UserTokenRecharge')
            .then(function (UserTokenRechargeRegistry) {
                // update the grower's balance
                return UserTokenRechargeRegistry.addAll([usertokenrecharge]);
            });

    }


    /**
     * 管理员同意充值 rechargeID
     * @param {token.CheckUserRecharge} checkuserRecharge 
     * @transaction
     */
    async function  checkuserrecharge(checkuserRecharge) {
        var NS = 'token';
        var usertokenrecharge = checkuserRecharge.rechargeID;
        usertokenrecharge.confirmBank = 'Y';
        
        // 硬编码bank  bank总发行量增加
        
        const CentralBankRegistry = await getParticipantRegistry(NS + '.CentralBank');
        const bank = await CentralBankRegistry.get('centralbank@email.com');
        
        bank.totalIssueToken += usertokenrecharge.tokenNum;
        usertokenrecharge.user.accountBalance += usertokenrecharge.tokenNum;
            
        await CentralBankRegistry.update(bank);

        const UserRegistry = await getParticipantRegistry(NS + '.User');
        await UserRegistry.update(usertokenrecharge.user);

        const UserTokenRechargeRegistry = await getAssetRegistry(NS + '.UserTokenRecharge');
        await UserTokenRechargeRegistry.update(usertokenrecharge);

    }

    /**
     * 管理员同意拒绝 rechargeID
     * @param {token.RejectUserRecharge} rejectUserRecharge 
     * @transaction
     */
    async function  rejectUserRecharge(rejectRequest) {
        var NS = 'token';
        var usertokenrecharge = rejectRequest.rechargeID;
        usertokenrecharge.confirmBank = 'R';   

        const UserTokenRechargeRegistry = await getAssetRegistry(NS + '.UserTokenRecharge');
        await UserTokenRechargeRegistry.update(usertokenrecharge);

    }






    /**
     * 
     * @param {token.UserConsumeService} userConsumeService - the userConsumeService transaction
     * @transaction
     */

    
    async function userconsumeservice(userConsumeService) {
        var service = userConsumeService.serviceID;
        var user = userConsumeService.user;
        var NS = 'token';
        // 硬编码 contract  bank
        var company = service.company;

        const CentralBankRegistry = await getParticipantRegistry(NS + '.CentralBank');
        const bank = await CentralBankRegistry.get('centralbank@email.com');
        
        const contractRegistry = await getAssetRegistry(NS + '.Contract');
        const contract = await contractRegistry.get('contract@mooc');
        
        if (service.servicePrice > user.accountBalance) {
            throw new Error('User should have enough balance.');
        }
        
        //权益分配
        var price = service.servicePrice;
        user.accountBalance -= price;
        bank.accountBalance += contract.platformPer * price;
        company.accountBalance += contract.companyPer * price;


        return getParticipantRegistry(NS + '.User')
            .then(function (UserRegistry) {
                // update the grower's balance
                return UserRegistry.update(user);
            })
            .then(function () {
                return getParticipantRegistry(NS + '.Company');
            })
            .then(function (CompanyRegistry) {
                // update the importer's balance
                return CompanyRegistry.update(company);
            })
            .then(function () {
                return getParticipantRegistry(NS + '.CentralBank');
            })
            .then(function (CentralBankRegistry) {
                // update the importer's balance
                return CentralBankRegistry.update(bank);
            });
    }



    
